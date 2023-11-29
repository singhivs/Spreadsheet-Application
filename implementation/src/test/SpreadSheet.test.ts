import { Cell } from "../model/Cell";
import { RangeExpression } from "../model/CellContent/RangeExpression";
import { StringLiteral } from "../model/CellContent/StringLiteral";
import { CellContent } from "../model/Interfaces/ICellContent";
import { Spreadsheet } from "../model/Spreadsheet";

describe("tests for non-empty spreadsheet", () => {
 let spreadsheet: Spreadsheet;

 beforeEach(() => {
  const cells: Cell[][] = [
   [
    new Cell(new StringLiteral("A"), 0, 0),
    new Cell(new StringLiteral("B"), 0, 1),
   ],
   [
    new Cell(new StringLiteral("C"), 1, 0),
    new Cell(new StringLiteral("D"), 1, 1),
   ],
  ];

  spreadsheet = new Spreadsheet(cells, 25, 25);
 });

 afterEach(() => {
  // clean up after each test
  spreadsheet = undefined!;
 });

 it("should set the content of a cell", () => {
  const row = 0;
  const col = 0;
  const content: CellContent = new StringLiteral("Test Content");

  spreadsheet.setCell(row, col, content);

  // retrieve the cell and check if its content matches the set value
  const cell = spreadsheet.getCell(row, col);
  expect(cell.getCellContent()).toBe(content);
 });

 it("should add a new row at the specified index", () => {
  spreadsheet.addRow(1);

  expect(spreadsheet.cells.length).toBe(3);
  expect(spreadsheet.cells[1].length).toBe(2);
 });

 it("should throw an error for an out-of-bounds index", () => {
  expect(() => spreadsheet.addRow(3)).toThrow(
   new Error("Row index out of bounds")
  );
 });

 it("should add a new column at the specified index", () => {
  spreadsheet.addColumn(1);

  expect(spreadsheet.cells.length).toBe(2);
  expect(spreadsheet.cells[0].length).toBe(3);
 });

 it("should throw an error for an out-of-bounds index 2", () => {
  expect(() => spreadsheet.addColumn(100)).toThrow(
   new Error("Column index out of bounds.")
  );
 });

 it("should delete the row at the specified index", () => {
  spreadsheet.deleteRow(1);

  expect(spreadsheet.cells.length).toBe(1);
  expect(spreadsheet.cells[0][0].getCellContent().getContent()).toBe("A");
 });

 it("should throw an error for an out-of-bounds index 3", () => {
  expect(() => spreadsheet.deleteRow(29)).toThrow(
   new Error("Row index out of bounds.")
  );
 });

 it("should delete the column at the specified index", () => {
  spreadsheet.deleteColumn(1);

  expect(spreadsheet.cells.length).toBe(2);
  expect(spreadsheet.cells[0].length).toBe(1);
 });

 it("should throw an error for an out-of-bounds index 4", () => {
  expect(() => spreadsheet.deleteColumn(211)).toThrow(
   new Error("Column index out of bounds.")
  );
 });

 it("should return the cell at the specified row and column", () => {
  const cell = spreadsheet.getCell(1, 1);

  expect(cell.getCellContent().getContent()).toBe("D");
 });

 it("should throw an error for out-of-bounds coordinates", () => {
  expect(() => spreadsheet.getCell(200, 1)).toThrow(
   new Error("Cell coordinates out of bounds.")
  );
 });

 it("should clear the content of the cell at the specified row and column", () => {
  spreadsheet.clearCellContents(1, 1);

  const cell = spreadsheet.getCell(1, 1);
  expect(cell.getCellContent().getContent()).toBe("");
 });

 it("should find all occurrences of a string in the spreadsheet", () => {
  const result = spreadsheet.find("A");

  expect(result).toEqual([[0, 0]]);
 });

 it("should return an empty array if the string is not found", () => {
  const result = spreadsheet.find("NotFound");

  expect(result).toEqual([]);
 });

 it("should update range expressions when adding a row", () => {
  // set content with a range expression in a cell
  const row = 0;
  const col = 0;
  const rangeExpression: CellContent = new RangeExpression(
   "SUM(A1:B2)",
   spreadsheet
  );
  spreadsheet.setCell(row, col, rangeExpression);

  // add a new row at index 1
  spreadsheet.addRow(1);

  // check if the range expression is updated in the cell
  const updatedCell = spreadsheet.getCell(0, 0);
  expect(updatedCell.getCellContent()).toBeInstanceOf(RangeExpression);
  expect(updatedCell.getCellContent().getContentString()).toBe("SUM(A1:B2)");
 });
});

describe("empty spreadsheet tests", (): void => {
 let spreadsheet: Spreadsheet;
 beforeEach((): void => {
  spreadsheet = new Spreadsheet([], 25, 25);
 });

 it("should number cells correctly to begin", (): void => {
  for (let i: number = 0; i < 20; i++) {
   for (let j: number = 0; j < 20; j++) {
    expect(spreadsheet.getCell(i, j).getRow()).toEqual(i);
    expect(spreadsheet.getCell(i, j).getCol()).toEqual(j);
   }
  }
 });

 it("should add a row", (): void => {
  spreadsheet.addRow(0);

  for (let i: number = 0; i < 21; i++) {
   for (let j: number = 0; j < 20; j++) {
    expect(spreadsheet.getCell(i, j)).toBeInstanceOf(Cell);
   }
  }
 });

 it("should not add a row past maxRow", (): void => {
  spreadsheet.addRow(0);
  spreadsheet.addRow(0);
  spreadsheet.addRow(0);
  spreadsheet.addRow(0);
  spreadsheet.addRow(0);
  spreadsheet.addRow(0);
  expect(spreadsheet.getCell(20, 19)).toBeInstanceOf(Cell);
  expect(spreadsheet.getCell(24, 19)).toBeInstanceOf(Cell);
  expect(() => {
   spreadsheet.getCell(25, 0);
  }).toThrow("Cell coordinates out of bounds.");
  expect(() => {
   spreadsheet.getCell(0, 25);
  }).toThrow("Cell coordinates out of bounds.");
 });
 it("should add a column", (): void => {
  spreadsheet.addColumn(0);
  for (let i: number = 0; i < 20; i++) {
   for (let j: number = 0; j < 21; j++) {
    expect(spreadsheet.getCell(i, j)).toBeInstanceOf(Cell);
   }
  }
 });
 it("should not add a column past maxCol", (): void => {
  spreadsheet.addColumn(0);
  spreadsheet.addColumn(0);
  spreadsheet.addColumn(0);
  spreadsheet.addColumn(0);
  spreadsheet.addColumn(0);

  expect(spreadsheet.getCell(19, 20)).toBeInstanceOf(Cell);
  expect(spreadsheet.getCell(19, 24)).toBeInstanceOf(Cell);
  expect(() => {
   spreadsheet.getCell(25, 0);
  }).toThrow("Cell coordinates out of bounds.");
  expect(() => {
   spreadsheet.getCell(0, 25);
  }).toThrow("Cell coordinates out of bounds.");
 });

 it("should delete a row", (): void => {
  spreadsheet.deleteRow(2);

  for (let i: number = 0; i < 19; i++) {
   for (let j: number = 0; j < 20; j++) {
    expect(spreadsheet.getCell(i, j)).toBeInstanceOf(Cell);
   }
  }
  expect(() => {
   spreadsheet.getCell(20, 20);
  }).toThrow("Cell coordinates out of bounds.");
  expect(() => {
   spreadsheet.getCell(20, 19);
  }).toThrow("Cell coordinates out of bounds.");
 });

 it("should delete a column", (): void => {
  spreadsheet.deleteColumn(1);
  for (let i: number = 0; i < 20; i++) {
   for (let j: number = 0; j < 19; j++) {
    expect(spreadsheet.getCell(i, j)).toBeInstanceOf(Cell);
   }
  }
  expect(() => {
   spreadsheet.getCell(20, 20);
  }).toThrow("Cell coordinates out of bounds.");
  expect(() => {
   spreadsheet.getCell(19, 20);
  }).toThrow("Cell coordinates out of bounds.");
 });

 it("should set the content of a cell", () => {
  const row = 0;
  const col = 0;
  const content: CellContent = new StringLiteral("Test Content");

  spreadsheet.setCell(row, col, content);

  // Retrieve the cell and check if its content matches the set value
  const cell = spreadsheet.getCell(row, col);
  expect(cell.getCellContent()).toBe(content);
  expect(spreadsheet.getCell(row, col).getCellContent()).toBe(content);
 });

 it("should retreive version in string csv form", (): void => {
  spreadsheet.setCell(0, 0, new StringLiteral("hello"));

  expect(spreadsheet.retrieveVersion()).toBe(
   ",,,,,,,,,,,,,,,,,,,,," +
    "\n,hello,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,," +
    "\n,,,,,,,,,,,,,,,,,,,,"
  );
 });

 it("should return no match for find", (): void => {
  expect(spreadsheet.find("hello")).toStrictEqual([]);
 });
});
