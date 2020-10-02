/* eslint-disable react/no-this-in-sfc */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameStyle from './style';
import Node from '../../components/Node/Node';
import Astar from '../../algorithms/astar';
import dijkstra from '../../algorithms/dijkstra';
import bfs from '../../algorithms/bfs';

const cols = localStorage.getItem('xCorSize')
	? parseInt(localStorage.getItem('xCorSize'), 10)
	: 10;
const rows = localStorage.getItem('yCorSize')
	? parseInt(localStorage.getItem('yCorSize'), 10)
	: 10;
const NODE_START_ROW = localStorage.getItem('yStartCor')
	? parseInt(localStorage.getItem('yStartCor'), 10)
	: 0;
const NODE_START_COL = localStorage.getItem('xStartCor')
	? parseInt(localStorage.getItem('xStartCor'), 10)
	: 4;
const NODE_END_ROW = localStorage.getItem('yEndCor')
	? parseInt(localStorage.getItem('yEndCor'), 10)
	: rows;
const NODE_END_COL = localStorage.getItem('xEndCor')
	? parseInt(localStorage.getItem('xEndCor'), 10)
	: cols;

const Pathfind = () => {
	const [Grid, setGrid] = useState([]);
	const [Path, setPath] = useState([]);
	const [winner, setWinner] = useState('');
	const [VisitedNodes] = useState([]);
	const [aStarDescription, setAstarDescription] = useState('');
	const [aStarLength, setAstarLength] = useState(0);
	const [bfsDescription, setBfsDescription] = useState('');
	const [bfsLength, setBfsLength] = useState(0);
	const [dijkstraDescription, setDijkstraDescription] = useState('');
	const [dijkstraLength, setDijkstraLength] = useState(0);
	const [algorithmName] = useState(localStorage.getItem('algorithm'));

	const [level] = useState(
		localStorage.getItem('level') ? localStorage.getItem('level') : 0
	); // level number decides number of blocks, lvl 0 = 0blocks, lvl 1 = 1block etc...

	const setRandomBlocks = (levelNumber) => {
		let counter = 0;
		if (counter < level) {
			for (let i = 0; i < level; i += 1) {
				while (counter < level) {
					const test = levelNumber[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 10)];
					if (
						test.isEnd === false && test.isStart === false && test.isWall === false
					) {
						test.isWall = true;
						counter += 1;
					}
				}
			}
		}
	};

	// Add Neighbours

	const addNeighbours = (grid) => {
		for (let i = 0; i < rows; i += 1) {
			for (let j = 0; j < cols; j += 1) {
				grid[i][j].addneighbours(grid);
			}
		}
	};
	// Spot Constructor
	function Spot(i, j) {
		this.x = i; // row
		this.y = j; // column
		this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
		this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
		this.g = 0;
		this.f = 0;
		this.h = 0;
		this.wallCount = level - 1;
		this.isWall = false;
		this.neighbours = [];
		this.previous = undefined;
		// eslint-disable-next-line func-names
		this.addneighbours = function (grid) {
			// eslint-disable-next-line no-shadow
			const i = this.x;
			// eslint-disable-next-line no-shadow
			const j = this.y;
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
		};
	}

	// GRID WITH NODE

	const gridWithNode = (
		<div>
			{Grid.map((row, rowIndex) => (
				<div key={row[rowIndex].id} className="rowWrapper">
					{row.map((col, colIndex) => {
						const { isStart, isEnd, isWall } = col;
						return (
							<Node
								key={col.id}
								isStart={isStart}
								isEnd={isEnd}
								row={rowIndex}
								col={colIndex}
								isWall={isWall}
							/>
						);
					})}
				</div>
			))}
		</div>
	);

	const nextLevel = (curLevel) => {
		const currentLevel = parseInt(curLevel, 10);

		if (currentLevel === 9) {
			localStorage.setItem('level', 0);
		} else {
			const levelUp = parseInt(currentLevel, 10) + 1;
			localStorage.setItem('level', levelUp);
		}
		window.location.href = '/game';
	};

	const visualizeShortestPath = (shortestPathNodes) => {
		for (let i = 0; i < shortestPathNodes.length; i += 1) {
			setTimeout(() => {
				const node = shortestPathNodes[i];
				document.getElementById(`node-${node.x}-${node.y}`).className =
'node node-shortest-path';
			}, 10 * i);
		}
	};

	const visualizePath = (/* pathName */) => {
		for (let i = 0; i <= VisitedNodes.length; i += 1) {
			if (i === VisitedNodes.length) {
				setTimeout(() => {
					visualizeShortestPath(Path);
				}, 20 * i);
			} else {
				setTimeout(() => {
					const node = VisitedNodes[i];
					document.getElementById(`node-${node.x}-${node.y}`).className = 'node node-visited';
				}, 20 * i);
			}
		}
	};

	// initializing visualization of the path

	if (localStorage.getItem('automatic') === 'automatic') {
		setTimeout(() => {
			visualizePath();
		}, 1000);
		setTimeout(() => {
			nextLevel(level);
			if (parseInt(level, 10) === 9) {
				localStorage.setItem('automatic', 'manual');
				window.location.href = '/';
			}
		}, 5000);
	}

	const createSpot = (grid) => {
		for (let i = 0; i < rows; i += 1) {
			for (let j = 0; j < cols; j += 1) {
				Math.random(100);
				grid[i][j] = new Spot(i, j);
				grid[i][j].id = parseInt(`${i}${j}`, 10); // ovo!
			}
		}
	};

	// Create the Grid
	const initializeGrid = () => {
		const grid = new Array(rows); // array constructor to cr8 array

		for (let i = 0; i < rows; i += 1) {
			grid[i] = new Array(cols);
		}
		createSpot(grid);
		setGrid(grid);
		setRandomBlocks(grid);
		addNeighbours(grid);
		const startNode = grid[NODE_START_ROW][NODE_START_COL];
		const endNode = grid[NODE_END_ROW][NODE_END_COL];
		const aStarPath = Astar(startNode, endNode);
		const dijksrtaPath = dijkstra(grid, startNode, endNode);
		const bfsPath = bfs(grid, startNode, endNode);
		startNode.isWall = false;
		endNode.isWall = false;

		setAstarDescription(aStarPath);
		setAstarLength(aStarPath.visitedNodes.length);
		setBfsLength(bfsPath.visitedNodes.length);
		setDijkstraLength(dijksrtaPath.visitedNodes.length);

		setDijkstraDescription(dijksrtaPath);
		setBfsDescription(bfsPath);
		if (localStorage.getItem('algorithm') === 'astar') {
			setWinner('Astar(A*)');
			setPath(aStarPath.path.reverse());
			// setVisitedNodes(aStarPath.visitedNodes);
		} else if (localStorage.getItem('algorithm') === 'dijkstra') {
			setWinner('Dijkstra');
			setPath(dijksrtaPath.path);
			// setVisitedNodes(dijksrtaPath.visitedNodes);
		} else if (localStorage.getItem('algorithm') === 'bfs') {
			setWinner('BFS');
			setPath(bfsPath.path.reverse());
			// setVisitedNodes(bfsPath.visitedNodes);
		} else {
			const bfsTime = bfsPath.AlgorithmCalcTime;
			const astarTime = aStarPath.AlgorithmCalcTime;
			const dijkstraTime = dijksrtaPath.AlgorithmCalcTime;
			const getWinner = Math.min(bfsTime, astarTime, dijkstraTime);
			if (getWinner === bfsTime) {
				setWinner('BFS');
				setPath(bfsPath.path.reverse());
				// setVisitedNodes(bfsPath.visitedNodes);
			} else if (getWinner === astarTime) {
				setWinner('Astar(A*)');
				setPath(aStarPath.path.reverse());
				// setVisitedNodes(aStarPath.visitedNodes);
			} else if (getWinner === dijkstraTime) {
				setWinner('Dijkstra');
				setPath(dijksrtaPath.path);
				// setVisitedNodes(dijksrtaPath.visitedNodes);
			}
		}
	};

	// Create the SPOT

	useEffect(() => {
		initializeGrid();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<GameStyle>
			<div className="Wrapper">
				<div className="buttons">
					<Link to="/" onClick={() => { localStorage.setItem('automatic', 'manual'); }}>Go Back to Config</Link>

					{localStorage.getItem('automatic') === 'manual' ? (
						<>
							<button type="button" className="visualize" onClick={visualizePath}>
								Visualize PATH
							</button>
							<button type="button" className="visualize" onClick={() => { nextLevel(level); }}>
								{parseInt(level, 10) === 9 ? 'Go to the 1st level.' : 'Go to the next Level'}
							</button>
						</>
					) : null}
				</div>
				<h1>Pathfind UI</h1>
				{algorithmName ? <h4>{algorithmName}</h4> : null}
				(Level:
				{parseInt(level, 10) + 1}
				)

				{winner && localStorage.getItem('algorithm') === 'all' ? (
					<h3>
						Winner:
						{winner}
					</h3>
				) : null}
				{gridWithNode}

				<div className="description-field">
					<p>
						<b>A*:</b>
						<br />
						Algorithm took &nbsp;
						<b>{aStarDescription.AlgorithmCalcTime}</b>
                        &nbsp;milliseconds to finish.
						<br />
						Algorithm checked  &nbsp;
						<b>{aStarLength}</b>
                        &nbsp; fields before finding solution.

					</p>
					<p>
						<b>BFS:</b>
						<br />
						Algorithm took &nbsp;
						<b>{bfsDescription.AlgorithmCalcTime}</b>
                        &nbsp;milliseconds to finish.
						<br />
						Algorithm checked  &nbsp;
						<b>{bfsLength}</b>
                        &nbsp; fields before finding solution.

					</p>
					<p>
						<b>DIJKSTRA:</b>
						<br />
						Algorithm took &nbsp;
						<b>{dijkstraDescription.AlgorithmCalcTime}</b>
                        &nbsp;milliseconds to finish.
						<br />
						Algorithm checked  &nbsp;
						<b>{dijkstraLength}</b>
                        &nbsp; fields before finding solution.

					</p>

				</div>
			</div>
		</GameStyle>
	);
};

export default Pathfind;
