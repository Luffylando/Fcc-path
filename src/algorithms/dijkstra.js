function getUnvisitedNeighbors(node, grid) {
	const neighbors = [];
	// const { col, row } = node;
	const col = node.y;
	const row = node.x;
	const COLS = localStorage.getItem('xCorSize')
		? parseInt(localStorage.getItem('xCorSize'), 10)
		: 10;
	const ROWS = localStorage.getItem('yCorSize')
		? parseInt(localStorage.getItem('yCorSize'), 10)
		: 10;

	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

	if (row < ROWS - 1 && col < COLS - 1) {
		if (grid[row + 1][col + 1]) {
			neighbors.push(grid[row + 1][col + 1]);
		} else if (grid[row - 1][col + 1]) {
			neighbors.push(grid[row - 1][col + 1]);
		} else if (grid[row + 1][col - 1]) {
			neighbors.push(grid[row + 1][col - 1]);
		} else {
			neighbors.push(grid[row - 1][col - 1]);
		}
	}
	if (row > 0 && col > 0) {
		if (grid[row + 1]) {
			neighbors.push(grid[row + 1][col - 1]);
		}
		if (grid[row - 1][col - 1]) {
			neighbors.push(grid[row - 1][col - 1]);
		}
		if (grid[row - 1][col + 1]) {
			neighbors.push(grid[row - 1][col + 1]);
		}
	}
	return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
	const nodes = [];
	for (let i = 0; i < grid.length; i += 1) {
		for (let j = 0; j < grid.length; j += 1) {
			if (grid[i][j].isStart) {
				grid[i][j].distance = 0;
			} else {
				grid[i][j].distance = Infinity;
			}
			nodes.push(grid[i][j]);
		}
	}
	return nodes;
}
function sortNodesByDistance(unvisitedNodes) {
	unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
function getNodesInShortestPathOrder(endNode) {
	const nodesInShortestPathOrder = [];
	let currentNode = endNode;

	while (currentNode !== undefined && currentNode !== null && currentNode.previousNode) {
		nodesInShortestPathOrder.unshift(currentNode);
		const getCurrentNode = currentNode.neighbours.sort((a, b) => a.distance - b.distance);
		// eslint-disable-next-line prefer-destructuring
		currentNode = getCurrentNode[0];
		// currentNode = currentNode.previousNode;
	}
	return nodesInShortestPathOrder;
}

function updateUnvisitedNeighbors(node, grid) {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
	for (let i = 0; i < unvisitedNeighbors.length; i += 1) {
		if (unvisitedNeighbors[i].distance === Infinity) {
			unvisitedNeighbors[i].distance = node.distance + 1;
		}
		unvisitedNeighbors[i].previousNode = unvisitedNeighbors[i];
	}
}

export default function dijkstra(grid, startNode, finishNode) {
	const start = performance.now();
	const visitedNodesInOrder = [];
	// startNode.distance = 0;
	const unvisitedNodes = getAllNodes(grid); // Q: different from using grid or slice of grid???

	while (unvisitedNodes.length) {
		sortNodesByDistance(unvisitedNodes);
		const closestNode = unvisitedNodes.shift();

		// If we encounter a wall, we skip it.
		if (!closestNode.isWall) {
			// If the closest node is at a distance of infinity,
			// we must be trapped and should stop.
			if (closestNode.distance === Infinity) {
				return visitedNodesInOrder;
			}
			closestNode.isVisited = true;
			visitedNodesInOrder.push(closestNode);

			if (closestNode === finishNode) {
				const getRoute = getNodesInShortestPathOrder(finishNode);
				const end = performance.now();
				return {
					AlgorithmCalcTime: end - start,
					path: getRoute,
					visitedNodes: visitedNodesInOrder,
				};
			}
			updateUnvisitedNeighbors(closestNode, grid);
		}
	}
	return 'No FInish';
}
