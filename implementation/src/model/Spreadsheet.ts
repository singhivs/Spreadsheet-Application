import { Cell } from "./Cell";
import { RangeExpression } from "./CellContent/RangeExpression";
import { StringLiteral } from "./CellContent/StringLiteral";
import { CellContent } from "./Interfaces/ICellContent";
import cloneDeep from "lodash/cloneDeep";

/**
 * Spreadsheet class manages a 2D array of cells and provides functionalities
 * like adding/deleting rows/columns, getting/setting/clearing cell contents,
 * handling errors, finding content, evaluating content, and managing version history.
 */
export class Spreadsheet {
 private lastFunctionCall: string = ""; //stores the last function envoked by a user, it used to implement the undo and redo functionality
 public cells: Cell[][]; // 2D array to hold the cells of the spreadsheet
 private versionHistory: Spreadsheet[] = []; // array to hold the version history of the spreadsheet
 private maxRow: number; // maximum allowed rows in the spreadsheet
 private maxCol: number; // maximum allowed columns in the spreadsheet

 /**
  * Constructor to initialize the spreadsheet with cells, version history, and optionally set max rows and columns.
  */
 public constructor(cells: Cell[][], maxRow: number, maxCol: number) {
  this.maxRow = maxRow;
  this.maxCol = maxCol;
  if (cells.length === 0) {
   this.cells = this.initializeCells();
  } else {
   this.cells = cloneDeep(cells);
  }
 }

 private initializeCells() {
  const cells: Cell[][] = [];
  for (let row = 0; row < 20; row++) {
   cells[row] = [];
   for (let col = 0; col < 20; col++) {
    const defaultContent = new StringLiteral("");
    cells[row][col] = new Cell(defaultContent, row, col);
   }
  }
  return cells;
 }

 /**
  * Method to add a new row to the spreadsheet.
  */
 public addRow(index: number): void {
  // first, check if the rowIndex is within the bounds of the current spreadsheet
  if (index < 0 || index > this.cells.length) {
   throw new Error("Row index out of bounds");
  }

  if (this.cells.length >= this.maxRow) return;

  // create a new row with default cells or however your Cell class is instantiated
  const newRow: Cell[] = new Array(this.cells[0].length)
   .fill(null)
   .map((_, colIndex) => {
    // replace with the correct instantiation of a default cell
    return new Cell(new StringLiteral(""), index, colIndex);
   });

  // insert the new row into the cells array at the specified index
  this.cells.splice(index, 0, newRow);

  // update the row indices for all rows below the inserted row
  for (let i = index + 1; i < this.cells.length; i++) {
   this.cells[i].forEach((cell) => {
    cell.setRow(cell.getRow() + 1);
   });
  }

  this.renumber(this.cells.length - 1, 0);

  // update range expressions
  this.updateRangeExpressionsForRowChange(index, "delete");
 }

 /**
  * Method to add a new column to the spreadsheet.
  */
 public addColumn(index: number): void {
  // check if columnIndex is within the bounds
  if (index < 0 || index > this.maxCol) {
   throw new Error("Column index out of bounds.");
  }

  if (this.cells[0].length >= this.maxCol) return;

  // insert a new column at columnIndex for each row
  for (let rowIndex = 0; rowIndex < this.cells.length; rowIndex++) {
   // create a new cell with default content, here I'm assuming a StringLiteral with an empty string
   const newCell = new Cell(new StringLiteral(""), rowIndex, index);
   // insert the new cell into the current row at the specified index
   this.cells[rowIndex].splice(index, 0, newCell);
  }

  // update range expressions
  this.updateRangeExpressionsForColumnChange(index, "add");
 }

 /**
  * Method to delete a row from the spreadsheet based on the provided index.
  */
 public deleteRow(index: number): void {
  // check if rowIndex is within the bounds
  if (index < 0 || index >= this.maxRow) {
   throw new Error("Row index out of bounds.");
  }

  // remove the row at rowIndex
  this.cells.splice(index, 1);

  // update range expressions
  this.updateRangeExpressionsForRowChange(index, "delete");
 }

 /**
  * Method to delete a column from the spreadsheet based on the provided index.
  */
 public deleteColumn(index: number): void {
  // check if columnIndex is within the bounds
  if (index < 0 || index >= this.maxCol) {
   throw new Error("Column index out of bounds.");
  }

  // remove the column at columnIndex from each row
  for (let row of this.cells) {
   row.splice(index, 1);
  }

  // update the column indices for cells after the removed column
  for (let row of this.cells) {
   for (let col = index; col < row.length; col++) {
    row[col].setCol(col);
   }
  }

  // update range expressions
  this.updateRangeExpressionsForColumnChange(index, "delete");
 }

 /**
  * Method to retrieve the content of a cell at the specified row and column.
  */
 public getCell(row: number, col: number): Cell {
  // check if the row and col are within the bounds of the spreadsheet
  if (
   row >= 0 &&
   row < this.cells.length &&
   col >= 0 &&
   col < this.cells[0].length
  ) {
   return this.cells[row][col];
  } else {
   // instead of returning null, throw an error
   throw new Error("Cell coordinates out of bounds.");
  }
 }

 /**
  * Method to set the content of a cell at the specified row and column.
  */
 public setCell(row: number, col: number, content: CellContent): void {
  // check if the row and col are within the bounds of the spreadsheet
  if (row >= 0 && row < this.maxRow && col >= 0 && col < this.maxCol) {
   this.cells[row][col].setCellContent(content);
  } else {
   // instead of returning null, throw an error
   throw new Error("Cell coordinates out of bounds.");
  }
 }

 /**
  * Method to clear the content of a cell at the specified row and column.
  */
 public clearCellContents(row: number, col: number): void {
  // get the cell at the given row and column number
  let cell = this.cells[row][col];

  // clear the cell
  cell.clear();
 }

 /**
  * Returns the content of a provided cell. If the content is null it passes it as a
  * CellContent type.
  */
 public getContent(cell: Cell): CellContent {
  return cell.getCellContent as unknown as CellContent;
 }

 /**
  * Method to find all occurrences of a string in the spreadsheet and return their positions.
  */
 public find(searchString: string): Array<[number, number]> {
  let result: Array<[number, number]> = [];
  for (let i = 0; i < this.cells.length; i++) {
   for (let j = 0; j < this.cells[0].length; j++) {
    let content = this.cells[i][j];
    if (content.getCellContent().getContent().includes(searchString)) {
     result.push([i, j]);
    }
   }
  }
  return result;
 }

 /**
  * Method to retrieve a String form of the spreadsheet
  */
 public retrieveVersion(): string {
  let ss: String[] = [];
  let start: string = ",";
  for (let i = 0; i < this.cells[0].length; i++) {
   start += ",";
  }
  ss.push(start);
  for (let i = 0; i < this.cells.length; i++) {
   let sTemp: String = ",";
   for (let j = 0; j < this.cells[i].length; j++) {
    sTemp += this.cells[i][j].getCellContent().getContent().toString();
    if (j + 1 !== this.cells[i].length) sTemp += ",";
   }
   ss.push(sTemp);
  }
  return ss.join("\n");
 }

 private updateRangeExpressionsForRowChange(
  rowIndex: number,
  changeType: "add" | "delete"
 ): void {
  this.cells.forEach((row, i) => {
   row.forEach((cell, j) => {
    if (cell.getCellContent() instanceof RangeExpression) {
     let rangeExpression = cell.getCellContent();
     let updatedExpression = this.updateRangeExpression(
      rangeExpression.getContentString(),
      rowIndex,
      null,
      changeType
     );
     rangeExpression.setContent(updatedExpression);
    }
   });
  });
 }

 private updateRangeExpressionsForColumnChange(
  columnIndex: number,
  changeType: "add" | "delete"
 ): void {
  this.cells.forEach((row, i) => {
   row.forEach((cell, j) => {
    if (cell.getCellContent() instanceof RangeExpression) {
     let rangeExpression = cell.getCellContent();
     let updatedExpression = this.updateRangeExpression(
      rangeExpression.getContentString(),
      null,
      columnIndex,
      changeType
     );
     rangeExpression.setContent(updatedExpression);
    }
   });
  });
 }

 private getCellCoordinates(cell: string): [string, string] | null {
  const col = cell.match(/[A-Z]+/)?.[0];
  const row = cell.match(/\d+/)?.[0];
  if (col === undefined || row === undefined) {
   return null;
  }
  return [col, row];
 }

 private updateRangeExpression(
  expression: string,
  rowIndex: number | null,
  columnIndex: number | null,
  changeType: "add" | "delete"
 ): string {
  // Parse the range expression to find the affected ranges
  const rangeRegex = /(SUM|AVERAGE)\(([A-Z]+\d+:[A-Z]+\d+)\)/;
  const match = expression.match(rangeRegex);
  if (!match) return expression; // If no range is found, return the expression as is

  const [, funcName, range] = match;

  // Use optional chaining to safely access properties and methods
  const cellCoordinates = this.getCellCoordinates(range);
  if (!cellCoordinates) {
   return expression;
  }

  const [startCell, endCell] = cellCoordinates;
  const [startCol, startRow] = startCell.split(":") ?? [];
  const [endCol, endRow] = endCell.split(":") ?? [];

  // Check if any of the values is undefined before using them
  if (
   startCol === undefined ||
   startRow === undefined ||
   endCol === undefined ||
   endRow === undefined
  ) {
   return expression;
  }
  let startRowIndex = parseInt(startRow);
  let endRowIndex = parseInt(endRow);
  let startColIndex = this.columnToIndex(startCol);
  let endColIndex = this.columnToIndex(endCol);

  // Update the range based on the type of change (add or delete)
  if (rowIndex !== null) {
   if (changeType === "add") {
    // Increment row indices if the added row is at or above the start of the range
    if (rowIndex <= startRowIndex) {
     startRowIndex += 1;
    }
    if (rowIndex <= endRowIndex) {
     endRowIndex += 1;
    }
   } else {
    // Decrement row indices if the deleted row is within the range
    if (rowIndex === startRowIndex && rowIndex === endRowIndex) {
     startRowIndex += 1;
     endRowIndex += 1;
    } else if (rowIndex >= startRowIndex && rowIndex <= endRowIndex) {
     // Remove the entire range if the deleted row is part of it
     return `${funcName}()`;
    } else if (rowIndex < startRowIndex) {
     startRowIndex -= 1;
    } else if (rowIndex < endRowIndex) {
     endRowIndex -= 1;
    }
   }
  }

  if (columnIndex !== null) {
   if (changeType === "add") {
    // Increment column indices if the added column is at or before the start of the range
    if (columnIndex <= startColIndex) {
     startColIndex += 1;
    }
    if (columnIndex <= endColIndex) {
     endColIndex += 1;
    }
   } else {
    // Decrement column indices if the deleted column is within the range
    if (columnIndex === startColIndex && columnIndex === endColIndex) {
     startColIndex += 1;
     endColIndex += 1;
    } else if (columnIndex >= startColIndex && columnIndex <= endColIndex) {
     // Remove the entire range if the deleted column is part of it
     return `${funcName}()`;
    } else if (columnIndex < startColIndex) {
     startColIndex -= 1;
    } else if (columnIndex < endColIndex) {
     endColIndex -= 1;
    }
   }
  }

  // Reconstruct the updated range expression
  const updatedStartRow = startRowIndex.toString();
  const updatedEndRow = endRowIndex.toString();
  const updatedStartCol = this.indexToColumn(startColIndex);
  const updatedEndCol = this.indexToColumn(endColIndex);
  const updatedRange = `${updatedStartCol}${updatedStartRow}:${updatedEndCol}${updatedEndRow}`;

  // Construct and return the updated range expression with the function name
  return `${funcName}(${updatedRange})`;
 }

 private columnToIndex(column: string): number {
  let sum = 0;
  for (let i = 0; i < column.length; i++) {
   sum *= 26;
   sum += column.charCodeAt(i) - "A".charCodeAt(0) + 1;
  }
  return sum - 1; // Convert to zero-indexed
 }

 private indexToColumn(index: number): string {
  let column = "";
  let i = index + 1;
  while (i > 0) {
   let mod = (i - 1) % 26;
   column = String.fromCharCode(65 + mod) + column;
   i = Math.floor((i - mod) / 26);
  }
  return column;
 }

 private renumber(rowStart: number, colStart: number): void {
  for (let i: number = rowStart; i < this.cells.length; i++) {
   for (let j: number = colStart; j < this.cells[i].length; j++) {
    if (this.cells[i][j] !== undefined) {
     this.cells[i][j].setRow(i);
     this.cells[i][j].setCol(j);
    }
   }
  }
 }
}
