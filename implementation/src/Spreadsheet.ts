/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Cell } from "./Cell";

/**
 * Spreadsheet class manages a 2D array of cells and provides functionalities
 * like adding/deleting rows/columns, getting/setting/clearing cell contents,
 * handling errors, finding content, evaluating content, and managing version history.
 */
export class Spreadsheet {
 public cells: Cell[][]; // 2D array to hold the cells of the spreadsheet
 private versionHistory: Spreadsheet[]; // array to hold the version history of the spreadsheet
 private maxRow: number; // maximum allowed rows in the spreadsheet
 private maxCol: number; // maximum allowed columns in the spreadsheet

 /**
  * Constructor to initialize the spreadsheet with cells, version history, and optionally set max rows and columns.
  */
 public constructor(
  cells: Cell[][],
  versionHistory: Spreadsheet[],
  maxRow: number = 1000,
  maxCol: number = 52
 ) {
  this.cells = cells;
  this.versionHistory = versionHistory;
  this.maxRow = maxRow;
  this.maxCol = maxCol;
  this.renumber(0, 0);
 }

 /**
  * Method to add a new row to the bottom of the spreadsheet.
  */
 public addRow(): void {
  if (this.cells.length === this.maxRow) {
   return;
  }
  const cellArr: Cell[] = [];
  for (let i: number = 0; i < this.cells[0].length; i++) {
   cellArr.push(new Cell(null));
  }
  this.cells.push(cellArr);
  this.renumber(this.cells.length - 1, 0);
 }

 /**
  * Method to add a new column to the right edge of the spreadsheet.
  */
 public addColumn(): void {
  if (this.cells[0].length === this.maxCol) {
   return;
  }
  for (let i: number = 0; i < this.cells.length; i++) {
   this.cells[i].push(new Cell(null)); // a cell with a null content (?)
  }
  this.renumber(0, this.cells[0].length);
 }

 /**
  * Method to delete a row from the spreadsheet based on the provided index.
  */
 public deleteRow(index: number): void {
  const arr: Cell[][] = this.cells.slice(0); // copy
  arr.splice(index - 1, 1);
  this.cells = arr;
  // need to update Cell locations
  this.renumber(index, 0);
 }

 /**
  * Method to delete a column from the spreadsheet based on the provided index.
  */
 public deleteColumn(index: number): void {
  // eslint-disable-next-line space-before-function-paren
  this.cells.map(function (val: Cell[]): void {
   val.splice(index, 1);
  });
  // need to update Cell locations
  this.renumber(0, index);
 }

 /**
  * Method to retrieve the content of a cell at the specified row and column.
  */
 public getCell(row: number, col: number): Cell {
  return this.cells[row][col];
 }

 /**
  * Method to set the content of a cell at the specified row and column.
  */
 public setCell(row: number, col: number, value: Cell): void {
  // ...
 }

 /**
  * Method to clear the content of a cell at the specified row and column.
  */
 public clearCellContents(row: number, col: number): void {
  // ...
 }

 /**
  * Method to handle errors and perform necessary actions or logging.
  */
 public handleErrors(): void {
  // ...
 }

 /**
  * Method to find all occurrences of a string in the spreadsheet and return their positions.
  */
 public find(searchString: string): [number, number][] {
  throw new Error("Method not implemented.");
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
