import { CellContent } from "../Interfaces/ICellContent";

/*
* CellContent that represents a formula.
*/
export class Formula implements CellContent {
  
    private val: string; // the formula in a string format
 
 
    /**
     * Constructor to initialize the formula with the given value.
     */
    public constructor(val: string) {
        // placeholder, later we will update the constructor or getContent
        // to store the result of the formula
        this.val = val;
    }
    getContentString(): string {
        return this.val;
    }
 
 
    /*
    * Returns the content of the cell in string form.
    */
    public getContent(): string {
        throw new Error("Method not implemented.");
    }
 
 
    /*
    * Changes the value of the cell to the given newval argument.
    */
    public setContent(newval: string): void {
        // ...
    }
 
 
 }
 