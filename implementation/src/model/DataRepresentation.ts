import { Spreadsheet } from "./Spreadsheet";

/*
 * ADataRepresentation class that gathers and organizes the data of all cells chosen to
 * be made into a graph. The will serve as an abstract class that can be extended for
 * different types of graphs we decide to represent, which will use the same constructor
 * but not necessarily the same visualize() function (e.g. scatter, bar, line, pie chart)
 */
export class DataRepresentation {
 /**
  * Constructor that parses string for cell references, locates the correct cells in the spreadsheet
  * and stores them for reference so that the graph can be updated with the related cells.
  */
 public constructor(
  private start: string,
  private end: string,
  private spreadsheet: Spreadsheet
 ) {}

 /**
  * Method to organize data for specific display purposes.
  */
 public getData(): number[] {
  // split the start and end cell references into column and row parts
  const [startCol, startRow] = this.splitCell(this.start);
  const [endCol, endRow] = this.splitCell(this.end);

  // initialize an array to store the extracted numerical values
  const vals = [];

  // iterate through the rows and columns within the specified range
  for (let row = startRow; row <= endRow; row++) {
   for (
    let col = this.columnToIndex(startCol);
    col <= this.columnToIndex(endCol);
    col++
   ) {
    // get the cell content at the current row and column
    const cell = this.spreadsheet.getCell(row, col);
    // parse the content as a floating-point number
    const value = parseFloat(cell.getCellContent().getContent());
    // check if the parsed value is a valid number (not NaN)
    if (!isNaN(value)) {
     // add the valid value to the vals array
     vals.push(value);
    }
   }
  }
  // return the array of extracted numerical values
  return vals;
 }

 /**
  * Helper function that converts a column letter to its corresponding index.
  */
 private columnToIndex(column: string): number {
  let sum = 0;

  // iterate through each character in the column string
  for (let i = 0; i < column.length; i++) {
   // convert the character to a numerical index (A=1, B=2, ..., Z=26)
   sum *= 26;
   sum += column.charCodeAt(i) - "A".charCodeAt(0) + 1;
  }

  return sum - 1; // convert to zero-indexed
 }

 /**
  * Helper function that splits a cell reference into column and row parts.
  */
 private splitCell(cell: string): [string, number] {
  // use a regular expression to match the column and row parts of the cell reference
  const match = cell.match(/([A-Z]+)(\d+)/);

  // check if a valid match was found and throw an error for an invalid cell reference
  if (!match) throw new Error("Invalid cell reference.");

  // extract the column and row parts and adjust the row to be zero-indexed
  const column = match[1];
  const row = parseInt(match[2]) - 1; // subtract 1 to make A1 (0, 0)

  // return the column and row parts as a tuple
  return [column, row];
 }
}
