import { Cell } from "../../Cell";
import { CellContent } from "../Interfaces/ICellContent";

/*
* CellContent that represents a cell reference.
*/
export class CellReference implements CellContent {


    private val: string; // the string that represents the cell reference (e.g. "REF(<cell>)")
 
 
    /**
     * Constructor to initialize the cell reference with the given value.
     */
    public constructor(referenced: Cell) {
        this.val = referenced.getRow() + "," + referenced.getCol();
        // NOTE: may change depending on how we want to identify cells or have the user input cell referenced
        //       eg: have the user input a letter for the col like in Excel 
        //           or have them input literally "rownum,colnum"
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
        /* 
        *  NOTE: this has to assume that whoever is calling this method is already passing 
        *        in the cell id in order to adhere to the interface method and that they 
        *        will use the id in this cell to search the spreadsheet for the referenced cell
        *        we may want to change this, planning to ask in OH this week
        */
        this.val = newval;
    }
 }
 