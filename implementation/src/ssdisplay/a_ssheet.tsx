import React, { useState, useEffect } from "react";
import "./a_ss.css";
import { CellV } from "./cell";
import { Spreadsheet } from "../SpreadSheet";
import { Cell } from "../Cell";
import { ContextMenu } from "./styles";
import useContextMenu from "./useContextMenu";

const cellA: Cell = new Cell(new NumericLiteral("1"), 0, 0);
const cellB: Cell = new Cell(new NumericLiteral("2"), 0, 1);
const cellC: Cell = new Cell(new NumericLiteral("3"), 0, 2);
const cellD: Cell = new Cell(new NumericLiteral("4"), 1, 0);
const cellE: Cell = new Cell(new NumericLiteral("5"), 1, 1);
const cellF: Cell = new Cell(new NumericLiteral("6"), 1, 2);
const cellG: Cell = new Cell(new NumericLiteral("7"), 2, 0);
const cellH: Cell = new Cell(new NumericLiteral("8"), 2, 1);
const cellI: Cell = new Cell(new NumericLiteral("9"), 2, 2);
const cellJ: Cell = new Cell(new NumericLiteral("10"), 3, 0);
const cellK: Cell = new Cell(new NumericLiteral("11"), 3, 1);
const cellL: Cell = new Cell(new NumericLiteral("12"), 3, 2);

// instead should pass the Spreadsheet in as a prop or value
export default function SpreadsheetV() {
 const arrCells: Cell[][] = [
  [cellA, cellB, cellC],
  [cellD, cellE, cellF],
  [cellG, cellH, cellI],
  [cellJ, cellK, cellL],
 ];

 const [model, reassess] = useState(new Spreadsheet(arrCells, 300, 52));
 const [tool, setTool] = useState(0);
 const { clicked, setClicked, points, setPoints } = useContextMenu();
 // get cell data
 const numToLetter = (col: number) => {
  let c = col;
  let start = "";
  while (c > -1) {
   start += String.fromCharCode((c % 26) + 65);
   c = c - 26;
  }
  return start;
 };

 function pressAddRow() {
  model.addRow(model.cells.length);
  console.log(model.cells);
  if (tool === 0) setTool(1);
  else setTool(0);
 }
 function pressAddCol() {
  model.addColumn(model.cells[0].length);
  console.log(model.cells);
  if (tool === 0) setTool(1);
  else setTool(0);
 }
 function pressDeleteCol(key: number) {
  // calculatorModel.pressActionKey(key);
  // setDisplay(calculatorModel.display());
 }
 function pressDeleteRow(key: number) {
  // calculatorModel.pressActionKey(key);
  // setDisplay(calculatorModel.display());
 }
 function setCellVal(val: String) {
  // setDisplay(calculatorModel.display());
 }
 useEffect(() => {
  // This effect will run after each state update
  console.log("model has been updated");
  reassess(model);
 }, [model, model.cells]);

 // below iterate over cell[][]
 return (
  <div className="grid mx-2">
   <div className="row col-12">
    <div className="offset-9 float-end col-1 input-group my-2">
     <div className="input-group-prepend">
      <i className="fa fa-search m-1 my-3"></i>
     </div>
     <input
      type="text"
      className="form-control m-1 "
      id="inlineFormInputGroup"
      placeholder="Search for ..."
     />
    </div>
   </div>
   <div className="row col-12 mx-2">
    <div className="container table-responsive row col">
     <table className="table table-striped table-bordered function-keys py-1">
      <thead>
       <th className="text-center py-2 border"></th>
       {model.cells[0].map((x, i) => (
        <th className="text-center border">{numToLetter(i)}</th>
       ))}
      </thead>
      <tbody>
       {model.cells.map((val, x) => {
        return (
         <tr>
          <th className="text-center pb-0">{x + 1}</th>
          {val.map((cell) => {
           return (
            <td
             className="text-center p-0 cell"
             onContextMenu={(e) => {
              e.preventDefault();
              setClicked(true);
              setPoints({
               x: e.pageX,
               y: e.pageY,
              });
             }}
            >
             <CellV displayValue={cell.getCellContent()}></CellV>
            </td>
           );
          })}
         </tr>
        );
       })}
      </tbody>
     </table>
    </div>
    <div className="col-btn">
     <button
      className="btn btn-sm btn-dark mx-1 mt-1 "
      title="add column"
      onClick={() => pressAddCol()}
     >
      <i className="fa fa-plus fs-5 pt-1"></i>
     </button>
    </div>
   </div>
   <button
    className="btn btn-sm btn-dark mx-2"
    title="add row"
    onClick={() => pressAddRow()}
   >
    <i className="fa fa-plus pt-1 fs-5"></i>
   </button>
   {clicked && <ContextMenu top={points.y} left={points.x} id="menu-menu" />}
  </div>
 );
}
