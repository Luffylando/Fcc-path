function Astar(startNode, endNode) {
  let openSet = []; //Nodes that we have to visit
  let closedSet = [];
  let path = []; // Nodes we already visited
  let visitedNodes = [];

  openSet.push(startNode);
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    let current = openSet[leastIndex];
    visitedNodes.push(current);
    if (current === endNode) {
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      return { path, visitedNodes };
    }

    openSet = openSet.filter((ele) => ele !== current);
    closedSet.push(current);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!closedSet.includes(neighbour) && !neighbour.isWall) {
        let tempG = current.g + 1;
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

  return { path, visitedNodes, error: "No Path found" };
}

function heruistic(a, b) {
  let d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
  return d;
}

export default Astar;