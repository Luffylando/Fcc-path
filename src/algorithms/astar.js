function heruistic(a, b) {
	const d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
	return d;
}

function Astar(startNode, endNode) {
	const start = performance.now();
	let openSet = []; // Nodes that we have to visit
	const closedSet = [];
	const path = []; // Nodes we already visited
	const visitedNodes = [];

	openSet.push(startNode);
	while (openSet.length > 0) {
		let leastIndex = 0;
		for (let i = 0; i < openSet.length; i += 1) {
			if (openSet[i].f < openSet[leastIndex].f) {
				leastIndex = i;
			}
		}

		const current = openSet[leastIndex];
		visitedNodes.push(current);
		if (current === endNode) {
			let temp = current;
			path.push(temp);
			while (temp.previous) {
				path.push(temp.previous);
				temp = temp.previous;
			}

			const end = performance.now();
			return {
				AlgorithmCalcTime: end - start,
				path,
				visitedNodes,
			};
		}

		openSet = openSet.filter(ele => ele !== current);
		closedSet.push(current);

		const { neighbours } = current;
		for (let i = 0; i < neighbours.length; i += 1) {
			const neighbour = neighbours[i];
			if (!closedSet.includes(neighbour) && !neighbour.isWall) {
				const tempG = current.g + 1;
				let newPath = false;
				if (openSet.includes(neighbour)) {
					if (tempG < neighbour.g) {
						neighbour.g = tempG;
						newPath = true;
					}
				} else {
					neighbour.g = tempG;
					newPath = true;
					openSet.push(neighbour);
				}
				if (newPath) {
					neighbour.h = heruistic(neighbour, endNode);
					neighbour.f = neighbour.g + neighbour.f;
					neighbour.previous = current;
				}
			}
		}
	}

	return { path, visitedNodes, error: 'No Path found' };
}

export default Astar;
