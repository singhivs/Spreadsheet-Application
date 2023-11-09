import React from "react";
export function Nav(props: any) {
  return (
    <div className="bg-nav grid row col-12">
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
          <button type="button" className="rounded float-end px-2 py-1 fs-6">
            help
          </button>
          <button
            type="button"
            title="save version"
            className="rounded float-end px-2 py-1 fs-6 mx-2"
          >
            <i className="fa fa-download"></i>
          </button>
          <button
            type="button"
            title="view versions"
            className="rounded float-end px-2 py-1 fs-6"
          >
            <i className="fa fa-floppy-disk"></i>
          </button>
        </h5>
      </div>
    </div>
  );
}
