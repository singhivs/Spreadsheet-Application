export class ADataRepresentation {
 // gathers and organizes the data of all cells chosen to be made into a graph

 // Abstract class may be extended for different types of graphs we decide to represent
 // which will use the constructor but not necessarily the same visualize()

 // holds the cell references in string format of all cells to be in the graph
 private rangeOfCells: string;
 private cellData: Array<Number>; // or Array<Cells> or Array<String> (cell refs)
 // automatic update

 public constructor(rangeOfCells: string) {
  // or input == rangeOfCells: string, spreadsheet: Spreadsheet
  // where is the conversion from string -> cell references -> data inside cells
  // parses string for cell references and stores values
 }

 public visualize(): void {
  //
 }
}
