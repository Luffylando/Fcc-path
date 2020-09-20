import React, { useState, useEffect } from "react";
import Node from "../components/Node";
import "./Pathfind.css";
import Astar from "../algorithms/astar";
import myAlg from "../algorithms/myAlg";

const cols = 10;
const rows = 10;
const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;

const Pathfind = () => {
  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [VisitedNodes, setVisitedNodes] = useState([]);
  const [level, setLevel] = useState(5); //level number decides number of blocks, lvl 0 = 0blocks, lvl 1 = 1block etc...

  useEffect(() => {
    let alg = localStorage.getItem("algorithm");
    if (!alg) {
      localStorage.setItem("algorithm", "astar-around");
    }
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
    const tetreb = myAlg(grid, startNode, endNode);

    console.log("tetreb", tetreb);
    console.log("path", path);
    startNode.isWall = false;
    endNode.isWall = false;
    // setPath(path.path.reverse());
    setPath(path);

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

  const chooseAlgorithm = (e) => {
    localStorage.setItem("algorithm", e.target.value);
    window.location.reload();
  };

  return (
    <div className="Wrapper">
      <select
        onChange={chooseAlgorithm}
        defaultValue={localStorage.getItem("algorithm")}
      >
        <option value="astar-cross">ASTAR CROSS</option>
        <option value="astar-around">ASTAR AROUND</option>
      </select>

      <button onClick={visualizePath}>Visualize PATH</button>

      <h1>Pathfind Cimponent</h1>
      {gridWithNode}
    </div>
  );
};

export default Pathfind;
