import { CellContent } from "../Interfaces/ICellContent";

/*
* CellContent that represents a string literal.
*/
export class StringLiteral implements CellContent {
  
    private val: string; // the content of the string literal
 
 
    /**
     * Constructor to initialize the string literal with the given value.
     */
    public constructor(val: string) {
        this.val = val;
    }
    getContentString(): string {
        throw new Error("Method not implemented.");
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