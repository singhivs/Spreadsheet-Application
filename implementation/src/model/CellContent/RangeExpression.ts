import { Spreadsheet } from "../../Spreadsheet";
import { CellContent } from "../Interfaces/ICellContent";

/*
 * CellContent that represents a range expression.
 */
export class RangeExpression implements CellContent {
  private val: string; // the range expression in string format (e.g. "SUM(<range of cells>)")
  private spreadsheet: Spreadsheet;

  /**
   * Constructor to initialize the string literal with the given value.
   */
  public constructor(val: string, spreadsheet: Spreadsheet) {
    this.val = val;
    this.spreadsheet = spreadsheet;
  }

  private splitCell(cell: string): [string, number] {
    const match = cell.match(/([A-Z]+)(\d+)/);
    if (!match) throw new Error("Invalid cell reference.");
    const column = match[1];
    const row = parseInt(match[2]) - 1; // Subtract 1 to make A1 (0, 0)
    return [column, row];
  }

  private columnToIndex(column: string): number {
    let sum = 0;
    for (let i = 0; i < column.length; i++) {
      sum *= 26;
      sum += column.charCodeAt(i) - "A".charCodeAt(0) + 1;
    }
    return sum - 1; // Convert to zero-indexed
  }

  private evaluateRangeExpression(): string {
    // Parse the range expression, e.g., "SUM(A1:B2)" or "AVERAGE(A1:B2)"
    const match = this.val.match(/(SUM|AVERAGE)\(([^)]+)\)/);
    console.log(match);
    if (!match) {
      // Check for unsupported operations first
      if (!this.val.match(/\b(SUM|AVERAGE)\b/)) {
        throw new Error("Unsupported operation.");
      }
      throw new Error("Invalid range expression.");
    }

    const operation = match[1];
    const range = match[2];
    const [startCell, endCell] = range.split(":");
    const [startCol, startRow] = this.splitCell(startCell);
    const [endCol, endRow] = this.splitCell(endCell);

    let sum = 0;
    let count = 0;

    for (let row = startRow; row <= endRow; row++) {
      for (
        let col = this.columnToIndex(startCol);
        col <= this.columnToIndex(endCol);
        col++
      ) {
        const cell = this.spreadsheet.getCell(row, col);
        const value = parseFloat(cell.getCellContent().getContent());
        if (!isNaN(value)) {
          sum += value;
          count++;
        }
      }
    }

    if (operation === "SUM") {
      return sum.toString();
    } else if (operation === "AVERAGE") {
      return count === 0 ? "0" : (sum / count).toString();
    } else {
      throw new Error("Unsupported operation.");
    }
  }

  /*
   * Returns the content of the cell in string form.
   */
  public getContent(): string {
    return this.evaluateRangeExpression();
  }

  /*
   * Changes the value of the cell to the given newval argument.
   */
  public setContent(newval: string): void {
    this.val = newval;
  }
}
