import React, { useEffect, useState } from "react";
import "./a_ss.css";
import { CellV } from "./cell";
import { Spreadsheet } from "../Spreadsheet";
import { Cell } from "../Cell";
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
import { DataRepresentation } from "../DataRepresentation";
import { isElementOfType } from "react-dom/test-utils";
import ErrorBoundary from "./error_boundary";

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

// instead should pass the Spreadsheet in as a prop or value
export default function SpreadsheetV() {
  const [searchValue, setSearchValue] = useState(""); // State for search input value
  const { points, setPoints } = useContextMenu();
  const arrCells: Cell[][] = createCells();
  const [model, reassess] = useState(new Spreadsheet(arrCells, 300, 52));
  const [tool, setTool] = useState(0);
  const [history, setHistory] = useState([model]);
  const [charts, setCharts]: any[] = useState([]);
  // const [history, dispatch] = useReducer(historyReducer, []);
  const [historyActiveIndex, setHistoryActiveIndex] = useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [interactionDisabled, setInteractionDisabled] = React.useState(false);

  useEffect(() => {
    // Attach an event listener to the "Close" button within the ErrorBoundary
    const closeButton = document.getElementById("close-error-button");
    if (closeButton) {
      closeButton.addEventListener("click", hideErrorPopup);
    }

    // Remove the event listener when the component unmounts
    return () => {
      if (closeButton) {
        closeButton.removeEventListener("click", hideErrorPopup);
      }
    };
  }, []); // Empty dependency array to run this effect only once

  function createCells(): Cell[][] {
    // Define the dimensions of the 2D array
    const numRows = 20;
    const numCols = 25;

    // Create a 2D array of cells
    const cellArray: Cell[][] = [];

    // Populate the 2D array with cells
    for (let row = 0; row < numRows; row++) {
      const rowArray: Cell[] = [];
      for (let col = 0; col < numCols; col++) {
        // Initialize each cell with a StringLiteral content (you can use any suitable CellContent)
        const cellContent = new StringLiteral("");
        const cell = new Cell(cellContent, row, col);
        rowArray.push(cell);
      }
      cellArray.push(rowArray);
    }
    return cellArray;
  }

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

  // Function to check if a cell value matches the search input
  const isCellMatchingSearch = (cellValue: string) => {
    if (searchValue !== "") {
      return cellValue.toLowerCase().includes(searchValue.toLowerCase());
    }
    return false;
  };


  function makeGraph(graph: any) {
    console.log(graph);

    const dr: DataRepresentation = new DataRepresentation(
      graph.start,
      graph.end,
      model
    );
    const vals2 = dr.getData();

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
    const arrC = charts.map((e: any) => e);
    arrC.push(<Chart type={graph.type} options={op} data={dat} />);
    setCharts(arrC);
  }

  function undo() {
    console.log("undo", { historyActiveIndex, history });
    if (historyActiveIndex > 0) {
      const newIndex = historyActiveIndex - 1;
      console.log("history new index", history[newIndex]);
      reassess(new Spreadsheet(history[newIndex].cells, 300, 52));
      setHistoryActiveIndex(newIndex);
    }
  }

  function redo() {
    if (historyActiveIndex < history.length - 1) {
      const newIndex = historyActiveIndex + 1;
      reassess(new Spreadsheet(history[newIndex].cells, 300, 52));
      setHistoryActiveIndex(newIndex);
    }
  }

  function updateCell(x: number, y: number, value: string) {
    // model.cells[x][y].getCellContent()?.setContent(value);
    // console.log(model.cells);
    // let newModel = Object.assign({}, model);
    // reassess(newModel);
    //const newModel = { ...model }; // Create a deep copy

    let newModel = new Spreadsheet(model.cells, 300, 52);
    let newModelHistory = new Spreadsheet(model.cells, 300, 52);

    if (newModel.cells[x][y].getCellContent() instanceof CellReference) {
      newModel.cells[x][y].setCellContent(new StringLiteral(value));
    } else {
      newModel.cells[x][y].getCellContent()?.setContent(value);
    }
    const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];
    console.log("astfastfastf");

    setHistory(newHistory);
    setHistoryActiveIndex(newHistory.length - 1);

    reassess(newModel);
    console.log("$", newHistory);
  }

  function pressAddRow(rowNr: number) {
    model.addRow(rowNr);
    console.log(model.cells);

    let newModel = new Spreadsheet(model.cells, 300, 52);
    const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];
    //console.log("abc", model.cells);
    setHistory(newHistory);
    console.log("addrow");
    setHistoryActiveIndex(newHistory.length - 1);

    if (tool === 0) setTool(1);
    else setTool(0);
  }

  function pressAddCol(colNr: number) {
    model.addColumn(colNr);
    console.log(model.cells);

    let newModel = new Spreadsheet(model.cells, 300, 52);
    const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];
    //console.log("abc", model.cells);
    console.log("addcol");
    setHistory(newHistory);
    setHistoryActiveIndex(newHistory.length - 1);

    if (tool === 0) setTool(1);
    else setTool(0);
  }

  function pressDelCol(colNr: number) {
    model.deleteColumn(colNr);

    let newModel = new Spreadsheet(model.cells, 300, 52);
    const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];
    //console.log("abc", model.cells);
    console.log("delcol");
    setHistory(newHistory);
    setHistoryActiveIndex(newHistory.length - 1);

    if (tool === 0) setTool(1);
    else setTool(0);
  }

  function pressDelRow(rowNr: number) {
    model.deleteRow(rowNr);

    let newModel = new Spreadsheet(model.cells, 300, 52);
    const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];
    //console.log("abc", model.cells);
    console.log("delrow");
    setHistory(newHistory);
    setHistoryActiveIndex(newHistory.length - 1);

    if (tool === 0) setTool(1);
    else setTool(0);
  }

  function clearCell(x: number, y: number) {
    let newModel = new Spreadsheet(model.cells, 300, 52);
    newModel.cells[x][y] = new Cell(new StringLiteral(""), x, y);

    reassess(newModel);
    console.log("clear new model", newModel);

    const newHistory = [...history.slice(0, historyActiveIndex + 1), newModel];
    setHistory(newHistory);
    setHistoryActiveIndex(newHistory.length - 1);
  }

  function checkExpression(x: number, y: number) {
      let value = model.cells[x][y].getCellContent()?.getContent();
      console.log(value);
      if (value.includes("SUM") || value.includes("AVERAGE")) {
        let content = new RangeExpression(value, model);
        model.cells[x][y].setCellContent(content);
        console.log(model.cells[x][y]);
        //let newModel = Object.assign({}, model);
        reassess(new Spreadsheet(model.cells, 300, 52));
        model.cells[x][y].getCellContent()?.getContent();
      }
      if (value.includes("REF")) {
        model.cells[x][y].setCellContent(new CellReference(value, model));
        console.log("@", model.cells);
        model.cells[x][y].getCellContent()?.getContent();
        reassess(new Spreadsheet(model.cells, 300, 52));
      }

  }

  // function showErrorPopup(errorMessage: string) {
  //   reassess(new Spreadsheet(model.cells, 300, 52));
  //   setErrorMessage(errorMessage); // Update the error message state
  //   setInteractionDisabled(true); // Disable user interactions
  // }

  function hideErrorPopup() {
    setErrorMessage(""); // Clear the error message state
    setInteractionDisabled(false); // Enable user interactions
  }

  // // Attach an event listener to the "Close" button
  // const closeButton = document.getElementById("close-error-button");

  // if (closeButton) {
  //   closeButton.addEventListener("click", hideErrorPopup);
  // }


  // below iterate over cell[][]
  return (
    <div>
      <Nav undo={undo} redo={redo} makeGraph={makeGraph} />
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
                        const cellValue = cell.getCellContent()?.getContent();
                        const highlightStyle = isCellMatchingSearch(cellValue as string)
                          ? { backgroundColor: "lightblue" } // Apply highlighting style
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
                            <ErrorBoundary
                              key={x + "-" + y}
                              onClose={hideErrorPopup}
                            >
                              <CellV
                                displayValue={cell.getCellContent()?.getContent()}
                                x={x}
                                y={y}
                                model={model}
                                reasses={reassess}
                                updateCell={updateCell}
                                checkExpression={checkExpression}
                                pressAddRow={pressAddRow}
                                pressAddCol={pressAddCol}
                                pressDelRow={pressDelRow}
                                pressDelCol={pressDelCol}
                                clearCell={clearCell}
                              />
                            </ErrorBoundary>
                            {/* {errorMessage && (
                              <div id="error-popup" className="error-popup">
                                <span id="error-message">{errorMessage}</span>
                                <button id="close-error-button" onClick={hideErrorPopup}>
                                  Close
                                </button>
                              </div>
                            )} */}
                            {interactionDisabled && (
                              <div className="interaction-overlay"></div>
                            )}
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
