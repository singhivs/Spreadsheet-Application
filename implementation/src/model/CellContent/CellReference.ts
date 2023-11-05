import { CellContent } from "../Interfaces/ICellContent";

/*
* CellContent that represents a cell reference.
*/
export class CellReference implements CellContent {


    private val: string; // the string that represents the cell reference (e.g. "REF(<cell>)")
 
 
    /**
     * Constructor to initialize the cell reference with the given value.
     */
    public constructor(val: string) {
        // placeholder, later we will update the constructor or getContent
        // to return the id of the referenced cell
        this.val = val;
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
 