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
    <li class="list-group-item">+ insert row above</li>
    <li class="list-group-item">+ insert row below</li>
    <li class="list-group-item">+ insert column left</li>
    <li class="list-group-item">+ insert column right</li>
    <li class="list-group-item">- delete row</li>
    <li class="list-group-item">- delete column</li>
    <li class="list-group-item"> {" \t"}clear cell</li>
   </ul>
  </div>
 );
}
