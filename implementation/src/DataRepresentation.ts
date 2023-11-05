import { Cell } from "./Cell";
import { Spreadsheet } from "./SpreadSheet";

/*
* ADataRepresentation class that gathers and organizes the data of all cells chosen to
* be made into a graph. The will serve as an abstract class that can be extended for
* different types of graphs we decide to represent, which will use the same constructor
* but not necessarily the same visualize() function (e.g. scatter, bar, line, pie chart)
*/
export class ADataRepresentation {
    private cellData: Array<Cell>; // the cell data used in the data representation
   
    /**
     * Constructor that parses string for cell references, locates the correct cells in the spreadsheet
     * and stores them for reference so that the graph can be updated with the related cells.
    */
    public constructor(rangeOfCells: string, spreadsheet: Spreadsheet) {
        // ...
    }
 
 
    /**
     * Method to organize data for specific display purposes.
     */
    public visualize(): void {}
 }
 