import React from "react";
import { useState } from "react";

interface IProps {
 displayValue: any;
}

export function CellV(props: IProps) {
 const [value, setVal] = useState(props.displayValue || "");
 return (
  <div className="flex">
   <input
    className="cell-single flex"
    value={value}
    onChange={(e) => setVal(e.target.value)}
   />
  </div>
 );
}
