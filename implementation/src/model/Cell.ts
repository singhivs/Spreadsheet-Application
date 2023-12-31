import { StringLiteral } from "./CellContent/StringLiteral";
import { CellContent } from "./Interfaces/ICellContent";

/**
 * Cell represents a cell from the spreadsheet. Each Cell object contains a cell content,
 * a row number and a column number.
 */
export class Cell {
  private content: CellContent; // the content of the cell
  private row: number; // the row number of the cell
  private col: number; // the column number of the cell

  /**
   * Constructor to initialize the cell with the content, row number and column number.
   */
  constructor(content: CellContent, row: number, col: number) {
    this.content = content;
    this.row = row;
    this.col = col;
  }

  /**
   * Method to clear or reset the cell content.
   */
  public clear(): void {
    this.content = new StringLiteral("");
  }

  /**
   * Method to set the value of the cell content.
   */
  public setCellContent(value: CellContent): void {
    this.content = value;
  }

  /**
   * Method to get the value of the cell content.
   */
  public getCellContent(): CellContent {
    return this.content;
  }

  /**
   * Method to set the column number to a given value.
   */
  public setCol(colNr: number): void {
    this.col = colNr;
  }

  /**
   * Method to get the column number of the cell.
   */
  public getCol(): number {
    return this.col;
  }

  /**
   * Method to set the row number to a given value.
   */
  public setRow(rowNr: number): void {
    this.row = rowNr;
  }

  /**
   * Method to get the row number of a cell.
   */
  public getRow(): number {
    return this.row;
  }
}
