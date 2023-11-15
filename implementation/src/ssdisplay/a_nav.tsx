import React, { useState } from "react";
import { Link } from "react-router-dom";
export function Nav(props: any) {
 const [vis, setVis] = useState(false);
 const [graph, setGraph] = useState({
  title: "",
  start: "",
  end: "",
  type: "bar",
  xax: "",
  yax: "",
 });

 // cloase modal and reset values
 function closeModal() {
  setVis(!vis);
  setGraph({
   title: "",
   start: "",
   end: "",
   type: "bar",
   xax: "",
   yax: "",
  });
 }
 // create a graph
 function create() {
  props.makeGraph(graph);
  closeModal();
 }

 return (
  <div className="d-flex justify-content-center bg-nav grid row col-12">
   <div className="container py-3">
    <h5>
     <div className="float-start py-1 px-3 text-white ">
      Spreadsheet App – 507
     </div>
     <button
      type="button"
      title="undo"
      className="rounded float-start px-2 py-1 fs-6 mx-2"
      onClick={props.undo}
     >
      <i className="fa fa-undo"></i>
     </button>
     <button
      type="button"
      title="redo"
      className="rounded float-start px-2 py-1 fs-6"
     >
      <i className="fa fa-redo"></i>
     </button>
     <Link className="nav-link black-" to="/help">
      <button type="button" className="rounded float-end px-2 py-1 fs-6">
       help
      </button>
     </Link>
     <button
      type="button"
      title="save version"
      className="rounded float-end px-2 py-1 fs-6 mx-2"
     >
      <i className="fa fa-download"></i>
     </button>
     <Link className="nav-link black-" to="/history">
      <button
       type="button"
       title="view versions"
       className="rounded float-end px-2 py-1 fs-6"
      >
       <i className="fa fa-floppy-disk"></i>
      </button>
     </Link>
     <button
      type="button"
      title="create chart"
      className="rounded float-end px-2 py-1 fs-6 mx-2"
      onClick={() => setVis(!vis)}
     >
      <i className="fa fa-chart-simple"></i>
     </button>
    </h5>
   </div>
   {vis && (
    <div className="mode">
     <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
       <div className="modal-header">
        <h5 className="modal-title pb-3" id="exampleModalLongTitle">
         <b>chart creation</b>
        </h5>
        <button
         type="button"
         className="close rounded float-end px-2 fs-6 mx-2"
         data-dismiss="modal"
         aria-label="Close"
         onClick={() => closeModal()}
        >
         <span aria-hidden="true">&times;</span>
        </button>
       </div>
       <div className="modal-body">
        <label>
         {" "}
         from*:{" "}
         <input
          placeholder="REF(A1)"
          className="form-control"
          onChange={(e) => setGraph({ ...graph, start: e.target.value })}
         />
        </label>
        <label className="mx-3 my-2">
         {" "}
         to*:{" "}
         <input
          placeholder="REF(A5)"
          className="form-control"
          onChange={(e) => setGraph({ ...graph, end: e.target.value })}
         />
        </label>
        <br />
        <label>
         type*:
         <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setGraph({ ...graph, type: e.target.value })}
         >
          <option selected value="bar">
           Bar
          </option>

          <option value="pie">Pie</option>
          <option value="line">Line</option>
          <option value="radar">Radar</option>
         </select>
        </label>

        <br />
        <label className="my-2">
         {" "}
         title:{" "}
         <input
          placeholder="2023 Temperatures"
          className="form-control"
          onChange={(e) => setGraph({ ...graph, title: e.target.value })}
         />
        </label>
        <br />
        <label>
         {" "}
         y-axis label:{" "}
         <input
          placeholder="Degrees"
          className="form-control"
          onChange={(e) => setGraph({ ...graph, yax: e.target.value })}
         />
        </label>
        <label className="mx-3 my-2">
         {" "}
         x-axis label:{" "}
         <input
          placeholder="Months"
          className="form-control"
          onChange={(e) => setGraph({ ...graph, xax: e.target.value })}
         />
        </label>
       </div>
       <div className="modal-footer">
        <button
         type="button"
         className="rounded float-end px-2 py-1 fs-6 mx-2 my-1"
         data-dismiss="modal"
         onClick={() => closeModal()}
        >
         Cancel
        </button>
        <button
         type="button"
         className="rounded float-end px-2 py-1 fs-6 mx-2"
         onClick={() => create()}
        >
         Create
        </button>
       </div>
      </div>
     </div>
    </div>
   )}
  </div>
 );
}
