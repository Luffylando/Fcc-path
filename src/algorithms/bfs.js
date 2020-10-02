function getNodesInShortestPathOrder(finishNode) {
	const nodesInShortestPathOrder = [];
	let currentNode = finishNode;

	while (currentNode !== undefined) {
		nodesInShortestPathOrder.push(currentNode);
		currentNode = currentNode.previous;
	}

	return nodesInShortestPathOrder;
}
function bfs(grid, startNode, finishNode) {
	const start = performance.now();

	const visitedNodesInOrder = [];
	const nextNodesStack = [startNode];
	for (let i = 0; i < grid.length; i += 1) {
		for (let j = 0; j < grid.length; j += 1) {
			if (grid[i][j] !== startNode) {
				if (grid[i][j] !== undefined) {
					grid[i][j].isVisited = false;
				}
			}
		}
	}
	while (nextNodesStack.length) {
		const currentNode = nextNodesStack.shift();
		if (currentNode === finishNode) {
			const end = performance.now();
			const test = getNodesInShortestPathOrder(currentNode);
			return {
				AlgorithmCalcTime: end - start,
				path: test,
				visitedNodes: visitedNodesInOrder,
			};
		}
		if (
			!currentNode.isWall &&
      (currentNode.isStart || !currentNode.isVisited)
		) {
			currentNode.isVisited = true;
			visitedNodesInOrder.push(currentNode);
			const row = currentNode.x;
			const col = currentNode.y;

			let nextNode;
			if (row > 0) {
				nextNode = grid[row - 1][col];

				if (!nextNode.isVisited) {
					nextNode.previousNode = currentNode;
					nextNodesStack.push(nextNode);
				}
			}
			if (row < grid.length - 1) {
				nextNode = grid[row + 1][col];
				if (!nextNode.isVisited) {
					nextNode.previousNode = currentNode;
					nextNodesStack.push(nextNode);
				}
			}
			if (col > 0) {
				nextNode = grid[row][col - 1];
				if (!nextNode.isVisited) {
					nextNode.previousNode = currentNode;
					nextNodesStack.push(nextNode);
				}
			}
			if (col < grid[0].length - 1) {
				nextNode = grid[row][col + 1];
				if (!nextNode.isVisited) {
					nextNode.previousNode = currentNode;
					nextNodesStack.push(nextNode);
				}
			}
		}
	}
	return visitedNodesInOrder;
}

export default bfs;
