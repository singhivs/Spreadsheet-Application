import React, { useState, useEffect, useRef } from "react";
import { Spreadsheet } from "../model/Spreadsheet";
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
  checkFormula: (x: number, y: number) => void;
  currentDisplayValue: any;
  setCurrentDisplayValue: any;
  pressAddRow: any;
  pressAddCol: any;
  pressDelRow: any;
  pressDelCol: any;
  clearCell: any;
}

export function CellV(props: IProps) {
  const [clicked, setClicked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
  }, []);

  const handleDropdownItemClick = () => {
    // Handle click on a dropdown item here
    // Close the dropdown by setting clicked state to false
    setClicked(false);
  };

  function handleValueChange(newValue: string) {
    try {
      // Handle your value change logic here
      props.updateCell(props.x, props.y, newValue);
    } catch (error) {
      console.error("Error while updating cell value:", error);
    }
  }

  return (
    <div className="flex">
      <input
        data-testid={`x${props.x}-y${props.y}`}
        className="cell-single flex"
        value={props.displayValue}
        onClick={() => {
          setClicked(true);
          props.setCurrentDisplayValue(props.model.cells[props.x][props.y]);
        }}
        onChange={(e) => {
          handleValueChange(e.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            try {
              props.checkFormula(props.x, props.y);
              props.checkExpression(props.x, props.y);
            } catch (error) {
              console.error("Error while checking expression:", error);
            }
          }
        }}
      />
      {clicked && (
        <div ref={dropdownRef}>
          <ContextMenu
            x={props.x}
            y={props.y}
            id="menu-menu"
            addRow={(x: number) => {
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
