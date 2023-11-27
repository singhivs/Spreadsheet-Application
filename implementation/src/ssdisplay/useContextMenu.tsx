import { useState, useEffect } from "react";

// custom hook for handling context menu behavior
const useContextMenu = () => {
  // state to track whether the context menu is clicked
  const [clicked, setClicked] = useState(false);

  // state to store the x and y coordinates of the click
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // event handler function to close the context menu when clicking anywhere
    const handleClick = () => setClicked(false);

    // attach the click event listener to the document
    document.addEventListener("click", handleClick);

    // remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []); // empty dependency array ensures this effect runs only once

  // return state and functions for context menu handling
  return {
    clicked,
    setClicked,
    points,
    setPoints,
  };
};

export default useContextMenu;
