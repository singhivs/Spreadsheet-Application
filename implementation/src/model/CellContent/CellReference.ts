import { Cell } from "../../model/Cell";
import { Spreadsheet } from "../Spreadsheet";
import { CellContent } from "../Interfaces/ICellContent";

/*
 * CellContent that represents a cell reference.
 */
export class CellReference implements CellContent {
  private val: string; // the string that represents the cell reference (e.g. "REF(<cell>)")
  private spreadsheet: Spreadsheet; // the spreadsheet object in which we need to search for the referenced value

  /**
   * Constructor to initialize the cell reference with the given value.
   */
  public constructor(val: string, spreadsheet: Spreadsheet) {
    this.val = val;
    this.spreadsheet = spreadsheet;
  }

  /*
   * Returns the string that represents the cell reference (e.g. "REF(<cell>)").
   */
  getContentString(): string {
    return this.val;
  }

  /*
   * Returns the content of the cell in string form.
   */
  public getContent(): string {
    // extract the cell reference from the "REF(...)" format
    const match = this.val.match(/REF\(([^)]+)\)/);
    if (!match) {
      throw new Error("Invalid cell reference format.");
    }
    const cellReference = match[1];

    // split the cell reference into row and column parts
    const [colStr, rowStr] = cellReference.split(/(\d+)/);
    const col = colStr.charCodeAt(0) - "A".charCodeAt(0);
    const row = parseInt(rowStr) - 1;

    // retrieve the content of the referenced cell from the spreadsheet
    const referencedCell = new Cell(
      this.spreadsheet.getCell(row, col).getCellContent(),
      row,
      col
    );

    // return the content of the referenced cell
    return referencedCell.getCellContent().getContent();
  }

  /*
   * Changes the value of the cell to the given newval argument.
   */
  public setContent(newval: string): void {
    // extract the cell reference from the "REF(...)" format
    const match = this.val.match(/REF\(([^)]+)\)/);
    if (!match) {
      throw new Error("Invalid cell reference format.");
    }
    const cellReference = match[1];

    // split the cell reference into row and column parts
    const [colStr, rowStr] = cellReference.split(/(\d+)/);
    const col = colStr.charCodeAt(0) - "A".charCodeAt(0);
    const row = parseInt(rowStr) - 1;

    // update the content of the referenced cell in the spreadsheet
    const referencedCell = this.spreadsheet.getCell(row, col);
    referencedCell.getCellContent().setContent(newval);
  }
}
