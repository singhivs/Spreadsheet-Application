import { Cell } from "../../Cell";
import { Spreadsheet } from "../../Spreadsheet";
import { CellContent } from "../Interfaces/ICellContent";

/*
 * CellContent that represents a cell reference.
 */
export class CellReference implements CellContent {
  private val: string; // the string that represents the cell reference (e.g. "REF(<cell>)")
  private spreadsheet: Spreadsheet;

  /**
   * Constructor to initialize the cell reference with the given value.
   */
  public constructor(val: string, spreadsheet: Spreadsheet) {
    this.val = val;
    this.spreadsheet = spreadsheet;
    // NOTE: may change depending on how we want to identify cells or have the user input cell referenced
    //       eg: have the user input a letter for the col like in Excel
    //           or have them input literally "rownum,colnum"
  }
  getContentString(): string {
    throw new Error("Method not implemented.");
  }

  /*
   * Returns the content of the cell in string form.
   */
  public getContent(): string {
    // Extract the cell reference from the "REF(...)" format
    const match = this.val.match(/REF\(([^)]+)\)/);
    if (!match) {
      throw new Error("Invalid cell reference format.");
    }
    const cellReference = match[1];

    // Split the cell reference into row and column parts
    const [colStr, rowStr] = cellReference.split(/(\d+)/);
    const col = colStr.charCodeAt(0) - "A".charCodeAt(0);
    const row = parseInt(rowStr) - 1;

    // Retrieve the content of the referenced cell from the spreadsheet
    const referencedCell = new Cell(
      this.spreadsheet.getCell(row, col).getCellContent(),
      row,
      col
    );
    return referencedCell.getCellContent().getContent();
  }

  /*
   * Changes the value of the cell to the given newval argument.
   */
  public setContent(newval: string): void {
    const match = this.val.match(/REF\(([^)]+)\)/);
    if (!match) {
      throw new Error("Invalid cell reference format.");
    }
    const cellReference = match[1];

    // Split the cell reference into row and column parts
    const [colStr, rowStr] = cellReference.split(/(\d+)/);
    const col = colStr.charCodeAt(0) - "A".charCodeAt(0);
    const row = parseInt(rowStr) - 1;

    // Update the content of the referenced cell in the spreadsheet
    const referencedCell = this.spreadsheet.getCell(row, col);
    referencedCell.getCellContent().setContent(newval);
  }
}
