import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import { Nav } from "./ssdisplay/a_nav";
import SpreadsheetV from "./ssdisplay/a_ssheet";

const root = ReactDOM.createRoot(
 document.getElementById("root") as HTMLElement
);
root.render(
 <React.StrictMode>
  <Nav />
  <SpreadsheetV />
 </React.StrictMode>
);
