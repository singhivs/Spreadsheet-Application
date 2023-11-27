import { Spreadsheet } from "../Spreadsheet";
import { CellContent } from "../Interfaces/ICellContent";

/*
 * CellContent that represents a range expression.
 */
export class RangeExpression implements CellContent {
  private val: string; // the range expression in string format (e.g. "SUM(<range of cells>)")
  private spreadsheet: Spreadsheet; // reference to the spreadsheet object where the range expression exists

  /**
   * Constructor to initialize the string literal with the given value.
   */
  public constructor(val: string, spreadsheet: Spreadsheet) {
    this.val = val;
    this.spreadsheet = spreadsheet;
  }

  /**
   * Helper function that splits a cell reference into its column and row parts
   * @param cell the cell position in string format
   * @returns returns the row and column pair (equivalent to the given cell position)
   */
  private splitCell(cell: string): [string, number] {
    // use a regular expression to match column and row
    const match = cell.match(/([A-Z]+)(\d+)/);

    // throw an error if the cell reference is invalid
    if (!match) throw new Error("Invalid cell reference.");

    // extract the column
    const column = match[1];

    // subtract 1 to make A1 (0, 0)
    const row = parseInt(match[2]) - 1;
    return [column, row];
  }

  /**
   * Helper function that converts a column name to its zero-indexed numerical
   * representation.
   */
  private columnToIndex(column: string): number {
    // initialize a variable to accumulate the numerical representation
    let sum = 0;
    for (let i = 0; i < column.length; i++) {
      // multiply by 26 for each character (Excel column naming scheme)
      sum *= 26;
      // convert letter to numerical representation
      sum += column.charCodeAt(i) - "A".charCodeAt(0) + 1;
    }
    return sum - 1; // convert to zero-indexed
  }

  /**
   * Helper function that evaluates the range expression and perform SUM or AVERAGE
   * operations.
   */
  private evaluateRangeExpression(): string {
    if (this.val == null) {
      // throw an error if the range expression is invalid
      throw new Error("Invalid range expression.");
    }
    // Parse the range expression, e.g., "SUM(A1:B2)" or "AVERAGE(A1:B2)"
    const match = this.val.match(/(SUM|AVERAGE)\(([^)]+)\)/);
    if (!match) {
      // Check for unsupported operations first
      if (!this.val.match(/\b(SUM|AVERAGE)\b/)) {
        // throw an error for unsupported operations
        throw new Error("Unsupported operation.");
      }
      // hhrow an error if the range expression is invalid
      throw new Error("Invalid range expression.");
    }

    const operation = match[1]; // extract the operation (SUM or AVERAGE)
    const range = match[2]; // extract the cell range
    const [startCell, endCell] = range.split(":"); // split range into start and end cells
    const [startCol, startRow] = this.splitCell(startCell); // get column and row for the start cell
    const [endCol, endRow] = this.splitCell(endCell); // get column and row for the end cell

    let sum = 0; // initialize a variable to accumulate the sum of cell values
    let count = 0; // initialize a variable to count the number of valid cells

    for (let row = startRow; row <= endRow; row++) {
      for (
        let col = this.columnToIndex(startCol);
        col <= this.columnToIndex(endCol);
        col++
      ) {
        // get the cell from the spreadsheet
        const cell = this.spreadsheet.getCell(row, col);

        // Get the numeric value of the cell content
        const value = parseFloat(cell.getCellContent().getContent());
        // if the resulting value is not equal to NaN
        if (!isNaN(value)) {
          // add the value to the sum
          sum += value;
          // increment the count for valid cells
          count++;
        }
      }
    }

    // if the operation is a sum
    if (operation === "SUM") {
      // return the sum as a string
      return sum.toString();
    }
    // if the operation is an average
    else if (operation === "AVERAGE") {
      // calculate and return the average as a string
      return count === 0 ? "0" : (sum / count).toString();
    } else {
      // throw an error for unsupported operations
      throw new Error("Unsupported operation.");
    }
  }

  /*
   * Returns the content of the cell in string form.
   */
  public getContent(): string {
    return this.evaluateRangeExpression();
  }

  /**
   * Returns the original range expression as a string.
   */
  public getContentString(): string {
    return this.val;
  }

  /*
   * Changes the value of the cell to the given newval argument.
   */
  public setContent(newval: string): void {
    this.val = newval;
  }
}
