const myAlg = (grid, startNode, endNode) => {
	const elements = [];
	for (let i = 0; i < grid.length; i += 1) {
		for (let j = 0; j < grid.length; j += 1) {
			grid[i][j].value = { x: grid[i][j].x, y: grid[i][j].y };

			if (grid[i][j].x > 0) {
				grid[i][j].left = {
					x: grid[i][j].x - 1,
					y: grid[i][j].y,
				};
			}
			if (grid[i][j].x < 9) {
				grid[i][j].right = {
					x: grid[i][j].x + 1,
					y: grid[i][j].y,
				};
			}
			if (grid[i][j].y > 0) {
				grid[i][j].top = {
					x: grid[i][j].x,
					y: grid[i][j].y - 1,
				};
			}
			if (grid[i][j].y < 9) {
				grid[i][j].bottom = {
					x: grid[i][j].x,
					y: grid[i][j].y + 1,
				};
			}
			elements.push(grid[i][j]);
		}
	}
	const queue = [];
	const path = [];
	// populate it with the node that will be the root of your search

	queue.push(grid[startNode.x][startNode.y]);
	// search the queue until it is empty
	while (queue.length > 0) {
		// assign the top of the queue to variable currentNode
		const currentNode = queue[0];
		path.push(currentNode);

		// if currentNode is the node we're searching for, break & alert
		if (currentNode.value === endNode.value) {
			return { path, visitedNodes: elements };
		}

		// if currentNode has a bottom child node, add it to the queue.
		if (currentNode.bottom !== undefined && currentNode.bottom.y < 10) {
			queue.push(grid[currentNode.bottom.x][currentNode.bottom.y]);
		}
		// if currentNode has a right child node, add it to the queue.
		if (currentNode.right !== undefined && currentNode.right.x < 10) {
			queue.push(grid[currentNode.right.x][currentNode.right.y]);
		} else if (currentNode.left !== undefined && currentNode.left.x > 0) {
		// if currentNode has a left child node, add it to the queue.
			queue.push(grid[currentNode.left.x][currentNode.left.y]);
		} else if (currentNode.top !== undefined && currentNode.top.y > 0) {
		// if currentNode has a left child node, add it to the queue.
			queue.push(grid[currentNode.top.x][currentNode.top.y]);
		}

		// remove the currentNode from the queue.
		queue.shift();
	}
	return ('Sorry, no such node found :(');
};

export default myAlg;
