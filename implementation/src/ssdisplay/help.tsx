import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "./a_ss.css";

// spreadsheet help menu like some documentation things explaining how to use our extra features
export default function Help() {
 return (
  <div>
   <div className="bg-nav grid row col-12">
    <div className="container py-3">
     <h5>
      <Link className="nav-link black-" to="/">
       <button
        type="button"
        title="view versions"
        className="rounded float-start px-2 mx-1 py-1 fs-6"
       >
        <i className="fa fa-angle-left"></i>
       </button>
      </Link>
      <div className="float-start py-1 px-3 text-white ">
       Spreadsheet Help Menu
      </div>
     </h5>
    </div>
   </div>
   <div
    className="px-4 pt-4 display-linebreak"
    style={{ whiteSpace: "pre-line" }}
   >
    {"initial you can put in numbers and strings and mathematical formulas... "}
    <p className="m-0 p-0">{"cell references work like REF(A4) "}</p>
    {"range expressions work like SUM(A1:A4) or AVG(A1:A4) blah blah blah"}
    <p className="m-0 p-0">
     {
      "you can also immediately clear a cell by clicking on it and choosing the clear cell option in the context menu"
     }
    </p>
    {"there is a maximum number of rows and columns that you may not exceed"}
   </div>
   <div className="px-4 pt-4">
    <strong>Adding Rows/Columns</strong>
    <div>
     the buttons at the top right and bottom left as well as after you click on
     a cell you can add a row/column in any of the directly adjacent directions
    </div>
   </div>
   <div className="px-4 pt-4">
    {" "}
    <strong>Deleting Rows/Columns</strong>
    <div>
     click on a cell in the row or column that you wan tot delet and choose the
     delet option in the context menu
    </div>
   </div>
   <div className="px-4 pt-4">
    {" "}
    <strong>Searching</strong>
    <div>description</div>
   </div>
   <div className="px-4 pt-4">
    {" "}
    <strong>Creating Charts</strong>
    <div>
     click on the chart button in the navigation menu enter the reference for
     the starting cell and ending cell. Cells will be displayed as a graph of
     your choosing in which all data points are displayed in order
    </div>
   </div>
   <div className="px-4 pt-4">
    {" "}
    <strong>Undo/Redo</strong>
    <div>description</div>
   </div>
   <div className="px-4 pt-4">
    {" "}
    <strong>Version History</strong>
    <div>description</div>
   </div>
  </div>
 );
}
