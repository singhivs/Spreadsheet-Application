import React from "react";

// define the props interface for the ContextMenu component
interface ContextMenuProps {
  x: number; // X-coordinate of the cell
  y: number; // Y-coordinate of the cell
  id: string; // the id of the menu
  addRow: (x: number) => void; // function to add a row
  addCol: (y: number) => void; // function to add a column
  delRow: (x: number) => void; // function to delete a row
  delCol: (y: number) => void; // function to delete a column
  clearCell: () => void; // function to clear the cell content
}

// define the ContextMenu functional component
export function ContextMenu(props: ContextMenuProps) {
  return (
    // render the context menu with dynamic top and left styles
    <div className="menu" id="menumenu">
      <ul className="list-group">
        {/* Menu items with click handlers */}
        <li
          className="list-group-item"
          onClick={() => {
            props.addRow(props.x);
          }}
        >
          + insert row above
        </li>
        <li
          className="list-group-item"
          onClick={() => {
            props.addRow(props.x + 1);
          }}
        >
          + insert row below
        </li>
        <li
          className="list-group-item"
          onClick={() => {
            props.addCol(props.y);
          }}
        >
          + insert column left
        </li>
        <li
          className="list-group-item"
          onClick={() => {
            props.addCol(props.y + 1);
          }}
        >
          + insert column right
        </li>
        <li
          className="list-group-item"
          onClick={() => {
            props.delRow(props.x);
          }}
        >
          - delete row
        </li>
        <li
          className="list-group-item"
          onClick={() => {
            props.delCol(props.y);
          }}
        >
          - delete column
        </li>
        <li
          className="list-group-item"
          onClick={() => {
            props.clearCell();
          }}
        >
          clear cell
        </li>
      </ul>
    </div>
  );
}

// Export a dummy component for MenuContextContainer (since it's not used in the provided code)
export const MenuContextContainer: React.FC = () => null;
