/* eslint-disable comma-dangle */
import { Cell } from "../model/Cell";
import { Spreadsheet } from "../model/Spreadsheet";
import { StringLiteral } from "../model/CellContent/StringLiteral";
import { CellContent } from "../model/Interfaces/ICellContent";
describe("spreadsheet", (): void => {
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
