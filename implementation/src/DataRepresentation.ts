import { Cell } from "./Cell";
import { Spreadsheet } from "./Spreadsheet";

/*
 * gathers and organizes the data of all cells chosen to be made into a graph
 * Abstract class may be extended for different types of graphs we decide to represent
 * which will use the constructor but not necessarily the same visualize()
 * e.g. scatter, bar, line, pie chart
 */
export class ADataRepresentation {
 private cellData: Cell[] = []; // or Array<Cells> or Array<String> (cell refs)

 // parses string for cell references and locates the correct cells in the spreadsheet
 // and stores them for reference so the graph can update with the related cells
 public constructor(rangeOfCells: string, spreadsheet: Spreadsheet) {}

 // organize data for specific display purposes
 public visualize(): void {}
}
