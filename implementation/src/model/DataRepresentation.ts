import { Cell } from "./Cell";
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
    const [startCol, startRow] = this.splitCell(this.start);
    const [endCol, endRow] = this.splitCell(this.end);

    const vals = [];
    for (let row = startRow; row <= endRow; row++) {
      for (
        let col = this.columnToIndex(startCol);
        col <= this.columnToIndex(endCol);
        col++
      ) {
        const cell = this.spreadsheet.getCell(row, col);
        const value = parseFloat(cell.getCellContent().getContent());
        if (!isNaN(value)) {
          vals.push(value);
        }
      }
    }
    return vals;
  }

  private columnToIndex(column: string): number {
    let sum = 0;
    for (let i = 0; i < column.length; i++) {
      sum *= 26;
      sum += column.charCodeAt(i) - "A".charCodeAt(0) + 1;
    }
    return sum - 1; // Convert to zero-indexed
  }
  private splitCell(cell: string): [string, number] {
    const match = cell.match(/([A-Z]+)(\d+)/);
    if (!match) throw new Error("Invalid cell reference.");
    const column = match[1];
    const row = parseInt(match[2]) - 1; // Subtract 1 to make A1 (0, 0)
    return [column, row];
  }
}
