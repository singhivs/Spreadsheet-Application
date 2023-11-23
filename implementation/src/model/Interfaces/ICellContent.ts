/*
 * CellContent represents the contents of a cell with its value stored in string form.
 */
export interface CellContent {
  /*
   * Returns the content of the cell in string form.
   */
  getContent(): string;

  getContentString(): string;

  /*
   * Changes the value of the cell to the given newval argument.
   */
  setContent(newval: string): void;
}
