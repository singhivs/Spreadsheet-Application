import React, { useState, useEffect, useRef } from "react";
import { Spreadsheet } from "../model/Spreadsheet";
import { ContextMenu } from "./styles";

// define the props interface for the CellV component (the props passed to the
// component)
interface IProps {
 displayValue: any;
 x: number;
 y: number;
 model: Spreadsheet;
 reasses: any;
 updateCell: any;
 checkExpression: any;
 checkFormula: (x: number, y: number) => void;
 currentDisplayValue: any;
 setCurrentDisplayValue: any;
 pressAddRow: any;
 pressAddCol: any;
 pressDelRow: any;
 pressDelCol: any;
 clearCell: any;
}

// define the CellV functional component
export function CellV(props: IProps) {
 // define a state variable 'clicked' and a function 'setClicked' to manage the dropdown state
 const [clicked, setClicked] = useState(false);
 // create a reference 'dropdownRef' to access the dropdown element in the DOM
 const dropdownRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  // Add a click event listener to the document
  const handleClickOutside = (event: MouseEvent) => {
   if (
    dropdownRef.current &&
    !dropdownRef.current.contains(event.target as Node)
   ) {
    // click is outside the dropdown, close it by setting 'clicked' state to false
    setClicked(false);
   }
  };

  // cttach the event listener
  document.addEventListener("mousedown", handleClickOutside);

  // clean up the event listener when the component unmounts
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, []);

 // define a function to handle dropdown item clicks
 const handleDropdownItemClick = () => {
  // handle click on a dropdown item here
  // close the dropdown by setting clicked state to false
  setClicked(false);
 };

 // define a function to handle cell value changes
 function handleValueChange(newValue: string) {
  try {
   // update the cell at the given position with the provided value
   props.updateCell(props.x, props.y, newValue);
  } catch (error) {
   // throw an error if updating the cell failed
   console.error("Error while updating cell value:", error);
  }
 }

 // render the CellV component
 return (
  <div className="flex">
   <input
    data-testid={`x${props.x}-y${props.y}`}
    className="cell-single flex"
    value={props.displayValue}
    onClick={() => {
     // when the input is clicked, set 'clicked' state to true and update 'currentDisplayValue'
     setClicked(true);
     props.setCurrentDisplayValue(props.model.cells[props.x][props.y]);
    }}
    onChange={(e) => {
     // handle input value changes and call 'handleValueChange'
     handleValueChange(e.target.value);
    }}
    onKeyDown={(event) => {
     if (event.key === "Enter") {
      try {
       // check for formulas and expressions when Enter key is pressed
       props.checkFormula(props.x, props.y);
       props.checkExpression(props.x, props.y);
      } catch (error) {
       // throw error if computing expressions or formulas failed
       console.error("Error while checking expression:", error);
      }
     }
    }}
   />
   {clicked && (
    <div ref={dropdownRef}>
     {/* Render the ContextMenu component when 'clicked' state is true */}
     <ContextMenu
      x={props.x}
      y={props.y}
      id="menu-menu"
      addRow={(x: number) => {
       handleDropdownItemClick(); // handle click and close dropdown
       props.pressAddRow(x); // call pressAddRow function
      }}
      addCol={(x: number) => {
       handleDropdownItemClick(); // handle click and close dropdown
       props.pressAddCol(x); // call pressAddCol function
      }}
      delCol={(x: number) => {
       handleDropdownItemClick(); // handle click and close dropdown
       props.pressDelCol(x); // call pressDelCol function
      }}
      delRow={(x: number) => {
       handleDropdownItemClick(); // handle click and close dropdown
       props.pressDelRow(x); // call pressDelRow function
      }}
      clearCell={() => {
       handleDropdownItemClick(); // handle click and close dropdown
       props.clearCell(props.x, props.y); // call clearCell function
      }}
     />
    </div>
   )}
  </div>
 );
}
