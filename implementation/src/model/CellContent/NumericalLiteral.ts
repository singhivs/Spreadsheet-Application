import { CellContent } from "../Interfaces/ICellContent";

/*
 * CellContent that represents a numeric literal.
 */
export class NumericLiteral implements CellContent {
  private val: string; // the value of the numeric literal in string format

  /**
   * Constructor to initialize the numeric literal with the given value.
   */
  public constructor(val: string) {
    this.val = val;
  }

  /*
   * Returns the string that represents the user input.
   */
  getContentString(): string {
    return this.val;
  }

  /*
   * Returns the content of the cell in string form.
   */
  public getContent(): string {
    return this.val;
  }

  /*
   * Changes the value of the cell to the given newval argument.
   */
  public setContent(newval: string): void {
    this.val = newval;
  }
}
