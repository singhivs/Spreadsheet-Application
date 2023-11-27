import React, { useEffect, useState } from "react";
import "./a_ss.css";
import { CellV } from "./cell";
import { Spreadsheet } from "../model/Spreadsheet";
import { Cell } from "../model/Cell";
import useContextMenu from "./useContextMenu";
import { RangeExpression } from "../model/CellContent/RangeExpression";
import { CellReference } from "../model/CellContent/CellReference";
import { StringLiteral } from "../model/CellContent/StringLiteral";
import { Nav } from "./a_nav";

import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 PointElement,
 LineElement,
 ArcElement,
 RadialLinearScale,
} from "chart.js";

import { Chart } from "react-chartjs-2";
import { DataRepresentation } from "../model/DataRepresentation";
import { Formula } from "../model/CellContent/FormulaClass";
import { NumericLiteral } from "../model/CellContent/NumericalLiteral";

// register Chart.js components
ChartJS.register(
 CategoryScale,
 RadialLinearScale,
 ArcElement,
 LinearScale,
 BarElement,
 PointElement,
 LineElement,
 Title,
 Tooltip
);

// define the main component
export default function SpreadsheetV() {
 // state for search input value
 const [searchValue, setSearchValue] = useState("");

 // custom hook to handle context menu behavior
 const { points, setPoints } = useContextMenu();

 // create initial cells
 const arrCells: Cell[][] = createCells();

 // state for the spreadsheet model
 const [model, reassess] = useState(new Spreadsheet(arrCells, 300, 52));

 // state for the current tool (0 for cell, 1 for row, 2 for column)
 const [tool, setTool] = useState(0);

 // state for the history of spreadsheet versions
 const [history, setHistory] = useState([model]);

 // state for storing charts
 const [charts, setCharts]: any[] = useState([]);

 // state for the active index in the history
 const [historyActiveIndex, setHistoryActiveIndex] = useState(0);

 // state for error message and error occurrence
 const [errorMessage, setErrorMessage] = React.useState("");
 const [errorOccurred, setErrorOccurred] = React.useState(false);

 // state for the spreadsheet title and editing mode
 const [spreadsheetTitle, setSpreadsheetTitle] = useState(
  "Your Spreadsheet Title"
 );
 const [isEditingTitle, setIsEditingTitle] = useState(false);

 // state for the current cell's display value
 const [currentDisplayVal, setCurrentDisplayVal] = useState(
  new Cell(model.cells[0][0].getCellContent(), 0, 0)
 );

 // function to handle title change
 const handleTitleChange = (newValue: string) => {
  setSpreadsheetTitle(newValue);
 };

 // function to start editing the title
 const handleEditTitle = () => {
  setIsEditingTitle(true);
 };

 // function to save the title changes
 const handleSaveTitle = () => {
  setIsEditingTitle(false);
 };

 // initial version history
 const firstVersion = {
  date: new Date().toLocaleDateString(), // use the current date
  description: "First version", // provide a description
 };

 // effect to attach an event listener to the error popup close button
 useEffect(() => {
  // attach an event listener to the "Close" button within the ErrorBoundary
  const closeButton = document.getElementById("close-error-button");
  if (closeButton) {
   closeButton.addEventListener("click", hideErrorPopup);
  }

  // remove the event listener when the component unmounts
  return () => {
   if (closeButton) {
    closeButton.removeEventListener("click", hideErrorPopup);
   }
  };
 }, []); // empty dependency array to run this effect only once

 // function to create initial cells for the spreadsheet
 function createCells(): Cell[][] {
  // define the dimensions of the 2D array
  const numRows = 20;
  const numCols = 25;

  // create a 2D array of cells
  const cellArray: Cell[][] = [];

  // populate the 2D array with cells
  for (let row = 0; row < numRows; row++) {
   const rowArray: Cell[] = [];
   for (let col = 0; col < numCols; col++) {
    // initialize each cell with an empty StringLiteral content
    const cellContent = new StringLiteral("");
    const cell = new Cell(cellContent, row, col);
    rowArray.push(cell);
   }
   cellArray.push(rowArray);
  }
  return cellArray;
 }

 // function to convert column number to letter
 const numToLetter = (col: number) => {
  let c = col;
  let start = "";
  while (c > -1) {
   start += String.fromCharCode((c % 26) + 65);
   c = c - 26;
  }
  return start;
 };

 // function to check if a cell value matches the search input
 const isCellMatchingSearch = (cellValue: string) => {
  if (searchValue !== "") {
   return cellValue.toLowerCase().includes(searchValue.toLowerCase());
  }
  return false;
 };

 // function to save the spreadsheet as a CSV file
 function save() {
  // retrieve the CSV data from the model
  const csv: string = model.retrieveVersion();

  // create an 'a' element for downloading
  const link = document.createElement("a");

  // create a Blob containing the CSV data with the specified MIME type
  const file = new Blob([csv], { type: "text/plain" });

  // set the href attribute of the link to the object URL of the Blob
  link.href = URL.createObjectURL(file);

  // specify the default filename for the downloaded file
  link.download = "spreadsheet.csv";

  // simulate a click event on the link to trigger the download
  link.click();

  // revoke the object URL to free up resources
  URL.revokeObjectURL(link.href);
 }

 // function to create a graph/chart
 function makeGraph(graph: any) {
  try {
   // create a DataRepresentation object with the specified parameters
   const dr: DataRepresentation = new DataRepresentation(
    graph.start,
    graph.end,
    model
   );

   // get data values for the graph
   const vals2 = dr.getData();

   // configure options for the graph
   const op = {
    responsive: true,
    plugins: {
     legend: {
      display: false,
     },
     title: {
      display: true,
      text: graph.title,
     },
    },
   };

   // create data for the graph
   const dat = {
    labels: ["", "", "", graph.xax, "", "", ""],
    datasets: [
     {
      label: graph.yax,
      data: vals2,
      backgroundColor: "#98ebd4",
     },
    ],
   };

   // clone the existing charts array and add a new Chart component to it
   const arrC = charts.map((e: any) => e);
   arrC.push(<Chart type={graph.type} options={op} data={dat} />);

   // update the state with the new array of charts
   setCharts(arrC);
  } catch (e: any) {
   // handle any errors by setting an "Cannot create chart. Error occured" error message
   setErrorMessage("Cannot create chart. Error occured");
   setErrorOccurred(true);
  }
 }

 // function to undo latest change
 function undo() {
  if (historyActiveIndex > 0) {
   // calculate the new index for the previous history element
   const newIndex = historyActiveIndex - 1;

   // reassess the spreadsheet using one of the versions within the history array
   // (the one at the computed index)
   reassess(new Spreadsheet(history[newIndex].cells, 300, 52));

   // update the history active index
   setHistoryActiveIndex(newIndex);
  }
 }

 // function to redo latest change
 function redo() {
  if (historyActiveIndex < history.length - 1) {
   // calculate the new index for the next history element
   const newIndex = historyActiveIndex + 1;

   // reassess the spreadsheet using one of the versions within the history array
   // (the one at the computed index)
   reassess(new Spreadsheet(history[newIndex].cells, 300, 52));

   // update the history active index
   setHistoryActiveIndex(newIndex);
  }
 }

 // function that updates the cell at the provided column and row, with the given value
 function updateCell(x: number, y: number, value: string) {
  // create new Spreadsheet models for updating the spreadsheet and the history
  let newModel = new Spreadsheet(model.cells, 300, 52);
  let newModelHistory = new Spreadsheet(model.cells, 300, 52);

  // check if the cell content is not a StringLiteral or NumericLiteral, and convert it if necessary
  if (
   !(
    newModel.cells[x][y].getCellContent() instanceof StringLiteral ||
    newModel.cells[x][y].getCellContent() instanceof NumericLiteral
   )
  ) {
   newModel.cells[x][y].setCellContent(
    new StringLiteral(newModel.cells[x][y].getCellContent().getContentString())
   );
  } else {
   // update the cell content with the provided value
   newModel.cells[x][y].getCellContent()?.setContent(value);
  }

  // reparse formulas that refer to this cell
  let newX = x + 1;
  reparse_ref(numToLetter(y) + newX, newModel);

  // create a new history by cloning the existing history and adding the new model
  const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];

  // Update the history with the new history and the index with the new history active index
  setHistory(newHistory);
  setHistoryActiveIndex(newHistory.length - 1);

  // reassess the spreadsheet
  reassess(newModel);

  // update the current display value
  setCurrentDisplayVal(new Cell(newModel.cells[x][y].getCellContent(), x, y));
 }

 // function that handles the addition of a row
 function pressAddRow(rowNr: number) {
  // add a new row to the spreadsheet model
  model.addRow(rowNr);

  // create a new model based on the current state of the spreadsheet cells
  let newModel = new Spreadsheet(model.cells, 300, 52);

  // reparse the formulas in the new model
  reparse(newModel);

  // create a new history with the updated model
  const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];

  // update the history state with the new history
  setHistory(newHistory);

  // set the active index in the history to the latest version
  setHistoryActiveIndex(newHistory.length - 1);

  // toggle the tool between cell (0) and row (1)
  if (tool === 0) setTool(1);
  else setTool(0);
 }

 // function that handles the addition of a column
 function pressAddCol(colNr: number) {
  // add a new column to the spreadsheet model
  model.addColumn(colNr);

  // create a new model based on the current state of the spreadsheet cells
  let newModel = new Spreadsheet(model.cells, 300, 52);

  // reparse the formulas in the new model
  reparse(newModel);

  // create a new history with the updated model
  const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];

  // update the history state with the new history
  setHistory(newHistory);

  // set the active index in the history to the latest version
  setHistoryActiveIndex(newHistory.length - 1);

  // toggle the tool between cell (0) and row (1)
  if (tool === 0) setTool(1);
  else setTool(0);
 }

 // function that handles the deletion of a column
 function pressDelCol(colNr: number) {
  // delete a column from the spreadsheet model
  model.deleteColumn(colNr);

  // create a new model based on the current state of the spreadsheet cells
  let newModel = new Spreadsheet(model.cells, 300, 52);

  // reparse the formulas in the new model
  reparse(newModel);

  // create a new history with the updated model
  const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];

  // update the history state with the new history
  setHistory(newHistory);

  // set the active index in the history to the latest version
  setHistoryActiveIndex(newHistory.length - 1);

  // toggle the tool between cell (0) and row (1)
  if (tool === 0) setTool(1);
  else setTool(0);
 }

 // function that handles the deletion of a row
 function pressDelRow(rowNr: number) {
  // delete a row from the spreadsheet model
  model.deleteRow(rowNr);

  // create a new model based on the current state of the spreadsheet cells
  let newModel = new Spreadsheet(model.cells, 300, 52);

  // reparse the formulas in the new model
  reparse(newModel);

  // create a new history with the updated model
  const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];

  // update the history state with the new history
  setHistory(newHistory);

  // set the active index in the history to the latest version
  setHistoryActiveIndex(newHistory.length - 1);

  // toggle the tool between cell (0) and row (1)
  if (tool === 0) setTool(1);
  else setTool(0);
 }

 // function that handles clearing the cell and the given (x, y) position
 function clearCell(x: number, y: number) {
  // create a new model based on the current state of the spreadsheet cells
  let newModel = new Spreadsheet(model.cells, 300, 52);

  // set the cell at position (x, y) to have an empty StringLiteral content
  newModel.cells[x][y] = new Cell(new StringLiteral(""), x, y);

  // reparse the formulas in the new model
  reparse(newModel);

  // reassess the new model
  reassess(newModel);

  // create a new history with the updated model
  const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];

  // udate the history state with the new history
  setHistory(newHistory);

  // set the active index in the history to the latest version
  setHistoryActiveIndex(newHistory.length - 1);
 }

 // function that checks for range expressions and cell references within the input and
 // parses them if found (gets the desired value)
 function checkExpression(x: number, y: number) {
  try {
   // get the value of the cell content at position (x, y)
   let value = model.cells[x][y].getCellContent()?.getContent();
   // check if the value includes "SUM" or "AVERAGE"
   if (value.includes("SUM") || value.includes("AVERAGE")) {
    // create a RangeExpression object based on the value
    let content = new RangeExpression(value, model);

    // set the cell content at position (x, y) to the new RangeExpression
    model.cells[x][y].setCellContent(content);

    // reassess the spreadsheet with the updated model
    reassess(new Spreadsheet(model.cells, 300, 52));

    // get the content of the updated cell
    model.cells[x][y].getCellContent()?.getContent();
   }

   // check if the value includes "REF"
   if (value.includes("REF")) {
    // set the cell content at position (x, y) to a new CellReference object
    model.cells[x][y].setCellContent(new CellReference(value, model));

    // get the content of the updated cell
    model.cells[x][y].getCellContent()?.getContent();

    // reassess the spreadsheet with the updated model
    reassess(new Spreadsheet(model.cells, 300, 52));
   }
  } catch (e: any) {
   // handle any errors by setting an error message and indicating an error occurred
   setErrorMessage(e.message);
   setErrorOccurred(true);
  }
 }

 // function that reparses the formulas within the spreadsheet that contain a
 // reference to the given cell
 function reparse_ref(cell: string, newModel: Spreadsheet): void {
  // go through all of the cells in the spreadsheet
  for (let i = 0; i < newModel.cells.length; i++) {
   for (let j = 0; j < newModel.cells[0].length; j++) {
    // if the current cell is a formula object and it contains a reference to the provided cell
    if (
     newModel.cells[i][j].getCellContent() instanceof Formula &&
     newModel.cells[i][j].getCellContent().getContentString().includes(cell)
    ) {
     // get the string of the current cell
     let value = newModel.cells[i][j].getCellContent().getContentString();
     // create a new Formula object based on the string (value)
     let content = new Formula(value, newModel);
     // parse the formula
     content.parse();
     // set the cell content at position (i, j) to the parsed content
     newModel.cells[i][j].setCellContent(content);
     // reassess the spreadsheet with the updated model
     reassess(new Spreadsheet(newModel.cells, 300, 52));
    }
   }
  }
 }

 // function that reparses all of the formulas within the spreadsheet
 function reparse(newModel: Spreadsheet): void {
  // go through all of the cells in the spreadsheet
  for (let i = 0; i < newModel.cells.length; i++) {
   for (let j = 0; j < newModel.cells[0].length; j++) {
    // if the current cell is a formula object
    if (newModel.cells[i][j].getCellContent() instanceof Formula) {
     // get the string of the current cell
     let value = newModel.cells[i][j].getCellContent().getContentString();
     // create a new Formula object based on the string (value)
     let content = new Formula(value, newModel);
     // parse the formula
     content.parse();
     // set the cell content at position (i, j) to the parsed content
     newModel.cells[i][j].setCellContent(content);
     // reassess the spreadsheet with the updated model
     reassess(new Spreadsheet(newModel.cells, 300, 52));
    }
   }
  }
 }

 // function that checks for formulas within the input and parses them if found
 function checkFormula(x: number, y: number) {
  try {
   // get the value of the cell content at position (x, y)
   let value = model.cells[x][y].getCellContent()?.getContent();

   // check if the value contains any mathematical operators (+, -, *, /)
   if (value.match(/[+-\/*]/)) {
    // create a new Formula object based on the value
    let content = new Formula(value, model);

    // parse the content
    content.parse();

    // set the cell content at position (x, y) to the parsed content
    model.cells[x][y].setCellContent(content);

    // reassess the spreadsheet with the updated model
    reassess(new Spreadsheet(model.cells, 300, 52));
   }
  } catch (e: any) {
   // handle any errors by setting an "Invalid Formula" error message
   setErrorMessage("Invalid Formula");
   setErrorOccurred(true);
  }
 }

 // function that handles hiding the error popup after the user closed it
 function hideErrorPopup() {
  // decrement the active index in the history
  const newIndex = historyActiveIndex - 1;

  // reassess the spreadsheet with the previous version from history
  reassess(new Spreadsheet(history[newIndex].cells, 300, 52));

  // clear the error message and indicate that no error occurred
  setErrorMessage("");
  setErrorOccurred(false);
 }

 // the code below iterates over the cell[][] and renders the spreadsheet grid
 // it also handles user interactions like right-click context menu and search
 return (
  <div>
   {errorOccurred && (
    <div id="error-popup" className="error-popup my-2">
     <span id="error-message" className="mx-3 py-2">
      {errorMessage}
     </span>
     <button
      id="close-error-button"
      className="rounded px-2 py-1 fs-6 mx-3 my-2"
      onClick={hideErrorPopup}
     >
      Close
     </button>
    </div>
   )}
   <Nav
    undo={undo}
    redo={redo}
    makeGraph={makeGraph}
    isEditingTitle={isEditingTitle}
    spreadsheetTitle={spreadsheetTitle}
    setSpreadsheetTitle={setSpreadsheetTitle}
    handleSaveTitle={handleSaveTitle}
    handleEditTitle={handleEditTitle}
    handleTitleChange={handleTitleChange}
    save={save}
   />
   <div className="grid mx-2">
    <div className="d-flex row col-12 justify-content-between">
     <div className="formula-box rounded col-8 my-3">
      fx: {currentDisplayVal.getCellContent().getContentString()}
     </div>
     <div className=" float-end col-1 input-group my-2">
      <div className="input-group-prepend">
       <i className="fa fa-search m-1 my-3"></i>
      </div>
      <input
       type="text"
       className="form-control m-1 "
       id="inlineFormInputGroup"
       placeholder="Search for ..."
       value={searchValue} // Bind input value to state
       onChange={(e) => setSearchValue(e.target.value)} // Handle input changes
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
           {val.map((cell, y) => {
            try {
             const cellValue = cell.getCellContent()?.getContentString();
             const cellString = cell.getCellContent()?.getContent();
             const highlightStyle = isCellMatchingSearch(cellString as string)
              ? { backgroundColor: "lightblue" } // apply highlighting style
              : {};

             return (
              <td
               className={"text-center p-0 cell"}
               onContextMenu={(e) => {
                e.preventDefault();
                setPoints({
                 x: e.pageX,
                 y: e.pageY,
                });
               }}
               style={highlightStyle}
              >
               {(() => {
                try {
                 return (
                  <CellV
                   displayValue={cell.getCellContent()?.getContent()}
                   x={x}
                   y={y}
                   model={model}
                   reasses={reassess}
                   updateCell={updateCell}
                   checkExpression={checkExpression}
                   checkFormula={checkFormula}
                   pressAddRow={pressAddRow}
                   pressAddCol={pressAddCol}
                   pressDelRow={pressDelRow}
                   pressDelCol={pressDelCol}
                   clearCell={clearCell}
                   setCurrentDisplayValue={setCurrentDisplayVal}
                   currentDisplayValue={currentDisplayVal
                    .getCellContent()
                    .getContentString()}
                  />
                 );
                } catch (error: any) {
                 console.error("Error:", error.message);
                }
               })()}
              </td>
             );
            } catch (error: any) {
             console.error("Error:", error.message);
            }
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
       onClick={() => pressAddCol(model.cells[0].length)}
      >
       <i className="fa fa-plus fs-5 pt-1"></i>
      </button>
     </div>
    </div>
    <button
     className="btn btn-sm btn-dark mx-2"
     title="add row"
     onClick={() => pressAddRow(model.cells.length)}
    >
     <i className="fa fa-plus pt-1 fs-5"></i>
    </button>
   </div>
   {charts.map((c: any, key: any) => {
    return <div className="m-4 graph-contain">{c}</div>;
   })}
  </div>
 );
}
