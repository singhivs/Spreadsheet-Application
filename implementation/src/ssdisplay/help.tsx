import React from "react";
import { Link } from "react-router-dom";
import "./a_ss.css";

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
      <div className="float-start py-1 px-3 text-white">
       Spreadsheet Help Menu
      </div>
     </h5>
    </div>
   </div>
   <div className="p-4">
    <h4>Getting Started</h4>
    <p>
     To begin using our spreadsheet application, you can enter numeric or string
     values directly into cells. Simply click on the cell you want to edit and
     start typing.
    </p>
   </div>
   <div className="p-4">
    <h4>Cell Operations</h4>
    <p>You can perform various operations on cells:</p>
    <ul>
     <li>
      <strong>Adding Rows/Columns:</strong> To add a row or column, click on a
      cell, and a context menu will appear. You can add a row above, below, or a
      column to the left or right of the selected cell. You can also use the
      buttons at the top right and bottom left marked with a '+' sign, in order
      to add a row or column.
     </li>
     <li>
      <strong>Deleting Rows/Columns:</strong> To delete a row or column, click
      on a cell within the row or column, and choose the delete option from the
      context menu.
     </li>
     <li>
      <strong>Entering Cell References:</strong> You can use cell references
      like REF(A4) within formulas to reference other cells in your
      calculations. Simply type that string in a cell and click 'Enter'. The
      cell value will change to the appropriate result (You can still view the
      original reference associated with the cell in the text box located above
      the spreadsheet that begins with 'fx:'')
     </li>
     <li>
      <strong>Entering Range Expressions:</strong> Range expressions like
      SUM(A1:A4) or AVG(A1:A4) can be used to perform calculations on a range of
      cells. Simply type that string in a cell and click 'Enter'. The cell value
      will change to the appropriate result (You can still view the original
      expression associated with the cell in the text box located above the
      spreadsheet that begins with 'fx:'')
     </li>
     <li>
      <strong>Entering Formulas:</strong> You can create formulas in cells to
      perform complex calculations. Enter you desired formula within a cell and
      click enter. The cell value will change to the appropriate result (You can
      still view the original formula associated with the cell in the text box
      located above the spreadsheet that begins with 'fx:''). An example of a
      formula would be : '1 + 2 * 3'.
     </li>
     <li>
      <strong>Clearing a Cell:</strong> You can also immediately clear a cell by
      clicking on it and choosing the clear cell option in the context menu.
     </li>
    </ul>
   </div>
   <div className="p-4">
    <h4>Additional Features</h4>
    <ul>
     <li>
      <strong>Undo/Redo:</strong> Our application provides undo and redo
      functionality to revert or reapply changes made to your spreadsheet. You
      can simply press on the undo button in order to undo the last change you
      made. Similarly, you can press on the redo button to go back to the change
      that was just reverted. The buttons are located in the navigation menu,
      right after the title of the spreadsheet (first undo, then redo). If you
      undo a change, and then modify the spreadsheet in any way, you will not be
      able to redo again.
     </li>
     <li>
      <strong>Search:</strong> Use the search bar to quickly find specific
      content within your spreadsheet. Click on the search bar (located above
      the spreadsheet, on the right) and type the string or value you would like
      to find. The cells that contain that string or value will be highlighted
      within the spreadsheet.
     </li>
     <li>
      <strong>Edit Spreadsheet Title:</strong> You can edit the title of your
      spreadsheet by clicking on the 'Edit' button in the navigation menu (in
      the top left of the screen) and changing the string inside the text box.
      When you are satisfied with your changes, simply click on the save button,
      in order to update the title.
     </li>
     <li>
      <strong>Creating Charts:</strong> Create charts by clicking on the chart
      button in the navigation menu (the first button on the top right corner of
      the screen). Enter the reference for the starting cell and ending cell you
      desire. Cells will be displayed as a graph of your choosing in which all
      data points are displayed in order (you can customize the graph using the
      buttons in the chart menu). The graphs will be displayed under the
      spreadsheet.
     </li>
     <li>
      <strong>Save as CSV:</strong> Save your spreadsheet as a CSV file for
      external use or sharing, by clicking the save button in the navigation
      menu (located in the top right corner of the screen).
     </li>
    </ul>
   </div>
  </div>
 );
}

// // spreadsheet help menu (some documentation that explains how to use our extra features)
// export default function Help() {
//   return (
//     <div>
//       <div className="bg-nav grid row col-12">
//         <div className="container py-3">
//           <h5>
//             <Link className="nav-link black-" to="/">
//               <button
//                 type="button"
//                 title="view versions"
//                 className="rounded float-start px-2 mx-1 py-1 fs-6"
//               >
//                 <i className="fa fa-angle-left"></i>
//               </button>
//             </Link>
//             <div className="float-start py-1 px-3 text-white ">
//               Spreadsheet Help Menu
//             </div>
//           </h5>
//         </div>
//       </div>
//       <div
//         className="px-4 pt-4 display-linebreak"
//         style={{ whiteSpace: "pre-line" }}
//       >
//         {
//           "initial you can put in numbers and strings and mathematical formulas... "
//         }
//         <p className="m-0 p-0">{"cell references work like REF(A4) "}</p>
//         {"range expressions work like SUM(A1:A4) or AVG(A1:A4) blah blah blah"}
//         <p className="m-0 p-0">
//           {
//             "you can also immediately clear a cell by clicking on it and choosing the clear cell option in the context menu"
//           }
//         </p>
//         {
//           "there is a maximum number of rows and columns that you may not exceed"
//         }
//       </div>
//       <div className="px-4 pt-4">
//         <strong>Adding Rows/Columns</strong>
//         <div>
//           the buttons at the top right and bottom left as well as after you
//           click on a cell you can add a row/column in any of the directly
//           adjacent directions
//         </div>
//       </div>
//       <div className="px-4 pt-4">
//         {" "}
//         <strong>Deleting Rows/Columns</strong>
//         <div>
//           click on a cell in the row or column that you wan tot delet and choose
//           the delet option in the context menu
//         </div>
//       </div>
//       <div className="px-4 pt-4">
//         {" "}
//         <strong>Searching</strong>
//         <div>description</div>
//       </div>
//       <div className="px-4 pt-4">
//         {" "}
//         <strong>Creating Charts</strong>
//         <div>
//           click on the chart button in the navigation menu enter the reference
//           for the starting cell and ending cell. Cells will be displayed as a
//           graph of your choosing in which all data points are displayed in order
//         </div>
//       </div>
//       <div className="px-4 pt-4">
//         {" "}
//         <strong>Undo/Redo</strong>
//         <div>description</div>
//       </div>
//       <div className="px-4 pt-4">
//         {" "}
//         <strong>Version History</strong>
//         <div>description</div>
//       </div>
//     </div>
//   );
// }
