export class Cell {
 private row: number = 0; // maximum allowed rows in the spreadsheet
 private col: number = 0; // maximum allowed columns in the spreadsheet
 private val: number | null;

 /**
  * Constructor to initialize the spreadsheet with cells, version history, and optionally set max rows and columns.
  */
 public constructor(val: number | null) {
  this.val = val;
 }

 public setCol(j: number): void {
  this.col = j;
 }
 public setRow(i: number): void {
  this.row = i;
 }
 public getCol(): number {
  return this.col;
 }
 public getRow(): number {
  return this.row;
 }
 public getVal(): number | null {
  return this.val;
 }
 // gathers and organizes the data of all cells chosen to be made into a graph
}
