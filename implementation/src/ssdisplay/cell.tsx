import React, { useState, useEffect, useRef } from "react";
import { Spreadsheet } from "../Spreadsheet";
import { ContextMenu } from "./styles";
import useContextMenu from "./useContextMenu";

interface IProps {
  displayValue: any;
  x: number;
  y: number;
  model: Spreadsheet;
  reasses: any;
  updateCell: any;
  checkExpression: any;
  pressAddRow: any;
  pressAddCol: any;
  pressDelRow: any;
  pressDelCol: any;
  clearCell: any;
}

export function CellV(props: IProps) {
  const [clicked, setClicked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Specify the type explicitly

  useEffect(() => {
    // Add a click event listener to the document
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Click is outside the dropdown, close it
        setClicked(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Missing comma here

  const handleDropdownItemClick = () => {
    // Handle click on a dropdown item here
    // Close the dropdown by setting clicked state to false
    setClicked(false);
  };

  return (
    <div className="flex">
      <input
        className="cell-single flex"
        value={props.displayValue}
        onClick={() => setClicked(true)}
        onChange={(e) => {
          console.log(e.target.value);
          props.updateCell(props.x, props.y, e.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            props.checkExpression(props.x, props.y);
          }
        }}
        //onBlur={props.checkExpression(props.x, props.y)}
      />
      {clicked && (
        <div ref={dropdownRef}>
          <ContextMenu
            x={props.x}
            y={props.y}
            id="menu-menu"
            addRow={(x: number) => {
              console.log(x);
              handleDropdownItemClick(); // Handle click and close dropdown
              props.pressAddRow(x);
            }}
            addCol={(x: number) => {
              handleDropdownItemClick(); // Handle click and close dropdown
              props.pressAddCol(x);
            }}
            delCol={(x: number) => {
              handleDropdownItemClick(); // Handle click and close dropdown
              props.pressDelCol(x);
            }}
            delRow={(x: number) => {
              handleDropdownItemClick(); // Handle click and close dropdown
              props.pressDelRow(x);
            }}
            clearCell={() => {
              handleDropdownItemClick();
              props.clearCell(props.x, props.y);
            }}
          />
        </div>
      )}
    </div>
  );
}
