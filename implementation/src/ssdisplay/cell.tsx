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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownItemClick = () => {
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
        className="cell-single flex"
        value={props.displayValue}
        onClick={() => setClicked(true)}
        onChange={(e) => {
          handleValueChange(e.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            try {
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
              handleDropdownItemClick();
              props.pressAddRow(x);
            }}
            addCol={(x: number) => {
              handleDropdownItemClick();
              props.pressAddCol(x);
            }}
            delCol={(x: number) => {
              handleDropdownItemClick();
              props.pressDelCol(x);
            }}
            delRow={(x: number) => {
              handleDropdownItemClick();
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
