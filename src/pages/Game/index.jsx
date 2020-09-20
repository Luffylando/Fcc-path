import React, { useState, useEffect } from "react";
import GameStyle from "./style";
import Node from "../../components/Node";
import Astar from "../../algorithms/astar";
import { Link } from "react-router-dom";

const cols = localStorage.getItem("xCorSize")
  ? parseInt(localStorage.getItem("xCorSize"))
  : 10;
const rows = localStorage.getItem("yCorSize")
  ? parseInt(localStorage.getItem("yCorSize"))
  : 10;
const NODE_START_ROW = localStorage.getItem("yStartCor")
  ? parseInt(localStorage.getItem("yStartCor"))
  : 0;
const NODE_START_COL = localStorage.getItem("xStartCor")
  ? parseInt(localStorage.getItem("xStartCor"))
  : 4;
const NODE_END_ROW = localStorage.getItem("xEndCor")
  ? parseInt(localStorage.getItem("xEndCor"))
  : rows - 1;
const NODE_END_COL = localStorage.getItem("yEndCor")
  ? parseInt(localStorage.getItem("yEndCor"))
  : cols - 1;

console.log("cols", cols);
console.log("rows", rows);
console.log("NODE_START_ROW", NODE_START_ROW);
console.log("NODE_START_COL", NODE_START_COL);
console.log("NODE_END_ROW", NODE_END_ROW);
console.log("NODE_END_COL", NODE_END_COL);

const Pathfind = () => {
  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [VisitedNodes, setVisitedNodes] = useState([]);
  const [level, setLevel] = useState(
    localStorage.getItem("level") ? localStorage.getItem("level") : 0
  ); //level number decides number of blocks, lvl 0 = 0blocks, lvl 1 = 1block etc...

  useEffect(() => {
    initializeGrid();
  }, []);

  //Create the Grid
  const initializeGrid = () => {
    const grid = new Array(rows); // array constructor to cr8 array

    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }
    createSpot(grid);
    setGrid(grid);
    setRandomBlocks(grid);
    addNeighbours(grid);
    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    const path = Astar(startNode, endNode);
    startNode.isWall = false;
    endNode.isWall = false;
    setPath(path.path.reverse());
    setVisitedNodes(path.visitedNodes);
  };

  //Create the SPOT

  const createSpot = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        Math.random(100);
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  const setRandomBlocks = (levelNumber) => {
    let counter = 0;
    if (counter < level) {
      for (let i = 0; i < level; i++) {
        while (counter < level) {
          let test =
            levelNumber[Math.floor(Math.random() * 10)][
              Math.floor(Math.random() * 10)
            ];
          if (
            test.isEnd === false &&
            test.isStart === false &&
            test.isWall === false
          ) {
            test.isWall = true;
            counter++;
          }
        }
      }
    }
  };

  // Add Neighbours

  const addNeighbours = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addneighbours(grid);
      }
    }
  };
  // Spot Constructor
  function Spot(i, j) {
    this.x = i; //row
    this.y = j; //column
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.wallCount = level - 1;
    this.isWall = false;
    this.neighbours = [];
    this.previous = undefined;
    this.addneighbours = function (grid) {
      let i = this.x;
      let j = this.y;
      if (localStorage.getItem("algorithm") === "astar-cross") {
        if (i > 0) {
          this.neighbours.push(grid[i - 1][j]);
        }
        if (i < rows - 1 && j < cols - 1) {
          if (grid[i + 1][j + 1]) {
            this.neighbours.push(grid[i + 1][j + 1]);
          } else if (grid[i - 1][j + 1]) {
            this.neighbours.push(grid[i - 1][j + 1]);
          } else if (grid[i + 1][j - 1]) {
            this.neighbours.push(grid[i + 1][j - 1]);
          } else {
            this.neighbours.push(grid[i - 1][j - 1]);
          }
        }
        if (i > 0 && j > 0) {
          if (grid[i + 1]) {
            this.neighbours.push(grid[i + 1][j - 1]);
          }
          if (grid[i - 1][j - 1]) {
            this.neighbours.push(grid[i - 1][j - 1]);
          }
          if (grid[i - 1][j + 1]) {
            this.neighbours.push(grid[i - 1][j + 1]);
          }
        }

        if (i < rows - 1) {
          this.neighbours.push(grid[i + 1][j]);
        }
        if (j > 0) {
          this.neighbours.push(grid[i][j - 1]);
        }
        if (j < cols - 1) {
          this.neighbours.push(grid[i][j + 1]);
        }
      } else if (localStorage.getItem("algorithm") === "astar-around") {
        if (i < rows - 1) {
          this.neighbours.push(grid[i + 1][j]);
        }
        if (i > 0) {
          this.neighbours.push(grid[i - 1][j]);
        }
        if (j > 0) {
          this.neighbours.push(grid[i][j - 1]);
        }
        if (j < cols - 1) {
          this.neighbours.push(grid[i][j + 1]);
        }
      } else {
        //
      }
    };
  }

  // GRID WITH NODE

  const gridWithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd, isWall } = col;
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                  isWall={isWall}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 10 * i);
    }
  };

  const visualizePath = (pathName) => {
    for (let i = 0; i <= VisitedNodes.length; i++) {
      if (i === VisitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(Path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = VisitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, 20 * i);
      }
    }
  };

  // initializing visualization of the path

  if (localStorage.getItem("automatic") === "automatic") {
    setTimeout(() => {
      visualizePath();
    }, 1000);
  }
  return (
    <GameStyle>
      <div className="Wrapper">
        <div className="buttons">
          <Link to="/">Go Back to Config</Link>

          {localStorage.getItem("automatic") === "manual" ? (
            <button className="visualize" onClick={visualizePath}>
              Visualize PATH
            </button>
          ) : null}
        </div>
        <h1>Pathfind UI</h1>
        {gridWithNode}
      </div>
    </GameStyle>
  );
};

export default Pathfind;
