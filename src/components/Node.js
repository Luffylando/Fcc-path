import React from "react";
import NodeStyle from "./nodestyle.jsx";

const Node = ({ isStart, isEnd, row, col, isWall }) => {
  const classes = isStart
    ? "node-start"
    : isWall
    ? "iswall"
    : isEnd
    ? "node-end"
    : "";
  return (
    <NodeStyle>
      <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>
    </NodeStyle>
  );
};

export default Node;
