import { Cell } from "./Cell";
import { NumericLiteral } from "./model/CellContent/NumericalLiteral";
import { RangeExpression } from "./model/CellContent/RangeExpression";
import { StringLiteral } from "./model/CellContent/StringLiteral";
import { CellContent } from "./model/Interfaces/ICellContent";

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
  this.cells = cells;
 }

 private initializeCells() {
  const cells: Cell[][] = [];
  for (let row = 0; row < this.maxRow; row++) {
   cells[row] = [];
   for (let col = 0; col < this.maxCol; col++) {
    const defaultContent = new StringLiteral("");
    cells[row][col] = new Cell(defaultContent, row, col);
   }
  }
  console.log(cells);
  return cells;
 }

 /**
  * Method to add a new row to the spreadsheet.
  */
 public addRow(index: number): void {
  // First, check if the rowIndex is within the bounds of the current spreadsheet
  if (index < 0 || index > this.cells.length) {
   throw new Error("Row index out of bounds");
  }

  //   // Create a new row with default cells or however your Cell class is instantiated
  //   const newRow: Cell[] = new Array(this.maxCol)
  //    .fill(null)
  //    .map((_, colIndex) => {
  //     // Replace with the correct instantiation of a default cell
  //     return new Cell(new NumericLiteral("0"), index, colIndex);
  //    });

  //   // Insert the new row into the cells array at the specified index
  //   this.cells.splice(index, 0, newRow);

  //   // Update the row indices for all rows below the inserted row
  //   for (let i = index + 1; i < this.cells.length; i++) {
  //    this.cells[i].forEach((cell) => {
  //     cell.setRow(cell.getRow() + 1);
  //    });
  //   }
  const cellArr: Cell[] = [];
  for (let i: number = 0; i < this.cells[0].length; i++) {
   cellArr.push(new Cell(new StringLiteral(""), i, this.cells[i].length));
  }
  this.cells.push(cellArr);
  this.renumber(this.cells.length - 1, 0);

  // Update range expressions
  this.updateRangeExpressionsForRowChange(index, "delete");
 }

 /**
  * Method to add a new column to the spreadsheet.
  */
 public addColumn(index: number): void {
  // Check if columnIndex is within the bounds
  if (index < 0 || index > this.maxCol) {
   throw new Error("Column index out of bounds.");
  }

  //   // Insert a new column at columnIndex for each row
  //   for (let rowIndex = 0; rowIndex < this.cells.length; rowIndex++) {
  //    // Create a new cell with default content, here I'm assuming a StringLiteral with an empty string
  //    const newCell = new Cell(new StringLiteral(""), rowIndex, index);
  //    // Insert the new cell into the current row at the specified index
  //    this.cells[rowIndex].splice(index, 0, newCell);
  //   }

  //   // Update the column indices for cells after the inserted column
  for (let i: number = 0; i < this.cells.length; i++) {
   this.cells[i].push(new Cell(new StringLiteral(""), i, this.cells[i].length));
  }
  this.renumber(0, this.cells[0].length);

  // Update range expressions
  this.updateRangeExpressionsForColumnChange(index, "add");
 }

 /**
  * Method to delete a row from the spreadsheet based on the provided index.
  */
 public deleteRow(index: number): void {
  // Check if rowIndex is within the bounds
  if (index < 0 || index >= this.maxRow) {
   throw new Error("Row index out of bounds.");
  }

  // Remove the row at rowIndex
  this.cells.splice(index, 1);

  // Update range expressions
  this.updateRangeExpressionsForRowChange(index, "delete");
 }

 /**
  * Method to delete a column from the spreadsheet based on the provided index.
  */
 public deleteColumn(index: number): void {
  // Check if columnIndex is within the bounds
  if (index < 0 || index >= this.maxCol) {
   throw new Error("Column index out of bounds.");
  }

  // Remove the column at columnIndex from each row
  for (let row of this.cells) {
   row.splice(index, 1);
  }

  // Update the column indices for cells after the removed column
  for (let row of this.cells) {
   for (let col = index; col < row.length; col++) {
    row[col].setCol(col);
   }
  }

  // Update range expressions
  this.updateRangeExpressionsForColumnChange(index, "delete");
 }

 /**
  * Method to retrieve the content of a cell at the specified row and column.
  */
 public getCell(row: number, col: number): Cell {
  // Check if the row and col are within the bounds of the spreadsheet
  if (row >= 0 && row < this.maxRow && col >= 0 && col < this.maxCol) {
   return this.cells[row][col];
  } else {
   // Handle out of bounds error
   this.handleErrors();
   // Instead of returning null, throw an error
   throw new Error("Cell coordinates out of bounds.");
  }
 }

 /**
  * Method to set the content of a cell at the specified row and column.
  */
 public setCell(row: number, col: number, content: CellContent): void {
  console.log(String(this.cells[row][col]));
  // Check if the row and col are within the bounds of the spreadsheet
  if (row >= 0 && row < this.maxRow && col >= 0 && col < this.maxCol) {
   this.cells[row][col].setCellContent(content);
  } else {
   // Handle out of bounds error
   this.handleErrors();
  }
 }

 /**
  * Method to clear the content of a cell at the specified row and column.
  */
 public clearCellContents(row: number, col: number): void {
  let cell = this.cells[row][col];
  cell.clear();
 }

 /**
  * Method to handle errors and perform necessary actions or logging.
  */
 public handleErrors(): void {
  // ...
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
    if (this.getContent(content).getContent.toString().includes(searchString)) {
     result.push([i, j]);
    }
   }
  }
  return result;
 }

 /**
  * Method to evaluate the content of a cell at the specified row and column.
  */
 public evaluateContent(row: number, col: number): any {
  throw new Error("Method not implemented.");
 }

 /**
  * Method to retrieve a specific version of the spreadsheet based on the provided index.
  */
 public retrieveVersion(versionIndex: number): Spreadsheet {
  throw new Error("Method not implemented.");
 }

 /**
  * Method to save the current state of the spreadsheet to the version history.
  */
 public saveVersion(): void {
  // ...
 }

 private updateRangeExpressionsForRowChange(
  rowIndex: number,
  changeType: "add" | "delete"
 ): void {
  this.cells.forEach((row, i) => {
   row.forEach((cell, j) => {
    if (cell.getCellContent() instanceof RangeExpression) {
     let rangeExpression = cell.getCellContent() as RangeExpression;
     let updatedExpression = this.updateRangeExpression(
      rangeExpression.getContent(),
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
     let rangeExpression = cell.getCellContent() as RangeExpression;
     let updatedExpression = this.updateRangeExpression(
      rangeExpression.getContent(),
      null,
      columnIndex,
      changeType
     );
     rangeExpression.setContent(updatedExpression);
    }
   });
  });
 }

 private updateRangeExpression(
  expression: string,
  rowIndex: number | null,
  columnIndex: number | null,
  changeType: "add" | "delete"
 ): string {
  // Parse the range expression to find the affected ranges
  const rangeRegex = /([A-Z]+)(\d+):([A-Z]+)(\d+)/;
  const match = expression.match(rangeRegex);
  if (!match) return expression; // If no range is found, return the expression as is

  let [_, startCol, startRow, endCol, endRow] = match;
  let startRowIndex = parseInt(startRow) - 1; // Convert to zero-based index
  let endRowIndex = parseInt(endRow) - 1; // Convert to zero-based index
  let startColIndex = this.columnToIndex(startCol);
  let endColIndex = this.columnToIndex(endCol);

  // Update the range based on the type of change
  if (rowIndex !== null) {
   if (changeType === "add") {
    if (rowIndex <= startRowIndex) {
     startRowIndex += 1;
    }
    if (rowIndex <= endRowIndex) {
     endRowIndex += 1;
    }
   } else {
    // 'delete'
    if (rowIndex < startRowIndex) {
     startRowIndex -= 1;
    } else if (rowIndex === startRowIndex) {
     startRowIndex = Math.min(startRowIndex, endRowIndex - 1);
    }

    if (rowIndex < endRowIndex) {
     endRowIndex -= 1;
    } else if (rowIndex === endRowIndex) {
     endRowIndex = Math.max(endRowIndex, startRowIndex + 1);
    }
   }
  }

  if (columnIndex !== null) {
   if (changeType === "add") {
    if (columnIndex <= startColIndex) {
     startColIndex += 1;
    }
    if (columnIndex <= endColIndex) {
     endColIndex += 1;
    }
   } else {
    // 'delete'
    if (columnIndex < startColIndex) {
     startColIndex -= 1;
    } else if (columnIndex === startColIndex) {
     startColIndex = Math.min(startColIndex, endColIndex - 1);
    }

    if (columnIndex < endColIndex) {
     endColIndex -= 1;
    } else if (columnIndex === endColIndex) {
     endColIndex = Math.max(endColIndex, startColIndex + 1);
    }
   }
  }

  // Reconstruct the range expression with the updated indices
  startRow = (startRowIndex + 1).toString();
  endRow = (endRowIndex + 1).toString();
  startCol = this.indexToColumn(startColIndex);
  endCol = this.indexToColumn(endColIndex);

  return `${match[1].slice(
   0,
   -startRow.length
  )}${startCol}${startRow}:${endCol}${endRow}`;
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
