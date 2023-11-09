export const MenuContextContainer = <div></div>;
export function ContextMenu(props) {
  let t = props.top + "px";
  let l = props.left + "px";
  console.log(t + " : " + l);
  //  document.getElementById("menumenu").style.top = t;
  //  document.getElementById("menumenu").style.left = l;
  return (
    <div style={{ top: t, left: l }} className="menu" id="menumenu">
      <ul class="list-group">
        <li
          class="list-group-item"
          onClick={() => {
            props.addRow(props.x);
          }}
        >
          + insert row above
        </li>
        <li
          class="list-group-item"
          onClick={() => {
            props.addRow(props.x + 1);
          }}
        >
          + insert row below
        </li>
        <li
          class="list-group-item"
          onClick={() => {
            props.addCol(props.y);
          }}
        >
          + insert column left
        </li>
        <li
          class="list-group-item"
          onClick={() => {
            props.addCol(props.y + 1);
          }}
        >
          + insert column right
        </li>
        <li
          class="list-group-item"
          onClick={() => {
            props.delRow(props.x);
          }}
        >
          - delete row
        </li>
        <li
          class="list-group-item"
          onClick={() => {
            props.delCol(props.y);
          }}
        >
          - delete column
        </li>
        <li
          class="list-group-item"
          onClick={() => {
            props.clearCell();
          }}
        >
          {" "}
          {" \t"}clear cell
        </li>
      </ul>
    </div>
  );
}
