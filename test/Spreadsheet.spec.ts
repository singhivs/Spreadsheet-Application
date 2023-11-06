/* eslint-disable comma-dangle */
import { Cell } from "../implementation/src/Cell";
import { Spreadsheet } from "../implementation/src/Spreadsheet";
describe("spreadsheet", (): void => {
 let spreadsheet: Spreadsheet;
 beforeEach((): void => {
  const cellA: Cell = new Cell(1);
  const cellB: Cell = new Cell(2);
  const cellC: Cell = new Cell(3);
  const cellD: Cell = new Cell(4);
  const cellE: Cell = new Cell(5);
  const cellF: Cell = new Cell(6);
  const cellG: Cell = new Cell(7);
  const cellH: Cell = new Cell(8);
  const cellI: Cell = new Cell(9);
  const cellJ: Cell = new Cell(10);
  const cellK: Cell = new Cell(11);
  const cellL: Cell = new Cell(12);
  const arrCells: Cell[][] = [
   [cellA, cellB, cellC],
   [cellD, cellE, cellF],
   [cellG, cellH, cellI],
   [cellJ, cellK, cellL],
  ];

  spreadsheet = new Spreadsheet(arrCells, [], 5, 10);
 });
 it("should number cells correctly to begin", (): void => {
  for (let i: number = 0; i < 4; i++) {
   for (let j: number = 0; j < 3; j++) {
    expect(spreadsheet.getCell(i, j).getRow()).toEqual(i);
    expect(spreadsheet.getCell(i, j).getCol()).toEqual(j);
   }
  }
  expect(spreadsheet.getCell(0, 0).getVal()).toEqual(1);
  expect(spreadsheet.getCell(0, 1).getVal()).toEqual(2);
  expect(spreadsheet.getCell(0, 2).getVal()).toEqual(3);
  expect(spreadsheet.getCell(1, 0).getVal()).toEqual(4);
  expect(spreadsheet.getCell(1, 1).getVal()).toEqual(5);
  expect(spreadsheet.getCell(1, 2).getVal()).toEqual(6);
  expect(spreadsheet.getCell(2, 0).getVal()).toEqual(7);
  expect(spreadsheet.getCell(2, 1).getVal()).toEqual(8);
  expect(spreadsheet.getCell(2, 2).getVal()).toEqual(9);
  expect(spreadsheet.getCell(3, 0).getVal()).toEqual(10);
  expect(spreadsheet.getCell(3, 1).getVal()).toEqual(11);
  expect(spreadsheet.getCell(3, 2).getVal()).toEqual(12);
 });
 it("should add a row", (): void => {
  spreadsheet.addRow();

  for (let i: number = 0; i < 5; i++) {
   for (let j: number = 0; j < 3; j++) {
    expect(spreadsheet.getCell(i, j)).toBeInstanceOf(Cell);
   }
  }
 });
 it("should add a column", (): void => {
  spreadsheet.addColumn();
  for (let i: number = 0; i < 4; i++) {
   for (let j: number = 0; j < 4; j++) {
    expect(spreadsheet.getCell(i, j)).toBeInstanceOf(Cell);
   }
  }
 });
 it("should delete a row", (): void => {
  spreadsheet.deleteRow(2);

  for (let i: number = 0; i < 3; i++) {
   for (let j: number = 0; j < 3; j++) {
    expect(spreadsheet.getCell(i, j)).toBeInstanceOf(Cell);
   }
  }
  expect(spreadsheet.getCell(2, 0).getVal()).toEqual(10);
  expect(spreadsheet.getCell(2, 1).getVal()).toEqual(11);
  expect(spreadsheet.getCell(2, 2).getVal()).toEqual(12);
 });
 it("should delete a column", (): void => {
  spreadsheet.deleteColumn(1);

  for (let i: number = 0; i < 4; i++) {
   for (let j: number = 0; j < 2; j++) {
    expect(spreadsheet.getCell(i, j)).toBeInstanceOf(Cell);
   }
  }
  expect(spreadsheet.getCell(0, 1).getVal()).toEqual(3);
  expect(spreadsheet.getCell(1, 1).getVal()).toEqual(6);
  expect(spreadsheet.getCell(2, 1).getVal()).toEqual(9);
  expect(spreadsheet.getCell(3, 1).getVal()).toEqual(12);
 });
});
