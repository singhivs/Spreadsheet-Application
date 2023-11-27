import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import SpreadsheetV from "./ssdisplay/a_ssheet";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Help from "./ssdisplay/help";

const root = ReactDOM.createRoot(
 document.getElementById("root") as HTMLElement
);

root.render(
 <React.StrictMode>
  <HashRouter>
   <Routes>
    <Route path="/" element={<SpreadsheetV />} />
    <Route path="/help" element={<Help />} />
   </Routes>
  </HashRouter>
 </React.StrictMode>
);
