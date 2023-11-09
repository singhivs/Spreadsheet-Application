import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "./a_ss.css";

// spreadsheet version history
export default function History() {
 return (
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
      Spreadsheet Version History
     </div>
     <Link className="nav-link black-" to="/help">
      <button type="button" className="rounded float-end px-2 py-1 fs-6">
       help
      </button>
     </Link>
    </h5>
   </div>
  </div>
 );
}
