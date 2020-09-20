const myAlg = (grid, startNode, endNode) => {
  let elements = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      grid[i][j].value = { x: grid[i][j].x, y: grid[i][j].y };

      if (grid[i][j].x > 0) {
        grid[i][j].left = {
          ...grid[i][j],
          x: grid[i][j].x - 1,
          y: grid[i][j].y,
        };
        grid[i][j].top = { x: grid[i][j].x, y: grid[i][j].y - 1 };
      }
      grid[i][j].right = { x: grid[i][j].x + 1, y: grid[i][j].y };
      grid[i][j].bottom = { x: grid[i][j].x, y: grid[i][j].y + 1 };
      elements.push(grid[i][j]);
    }
  }

  let queue = [];
  let path = [];
  // populate it with the node that will be the root of your search

  queue.push(grid[startNode.x][startNode.y]);
  // search the queue until it is empty
  while (queue.length > 0) {
    // assign the top of the queue to variable currentNode
    let currentNode = queue[0];
    console.log("CCCCC", currentNode);
    path.push(currentNode.value);

    // if currentNode is the node we're searching for, break & alert
    if (currentNode.value === endNode.value) {
      console.log("Found it!");
      return { path, visitedNodes: elements };
    }

    console.log("path", path);
    console.log("gridddddd", grid);
    // if currentNode has a bottom child node, add it to the queue.
    if (currentNode.bottom !== undefined && currentNode.bottom.y < 10) {
      queue.push(grid[currentNode.bottom.x][currentNode.bottom.y]);
      console.log("pushed bottom Node");
    }
    // if currentNode has a right child node, add it to the queue.
    else if (currentNode.right !== undefined) {
      queue.push(grid[currentNode.right.x][currentNode.right.y]);
      console.log("pushed right Node");
    }
    // if currentNode has a left child node, add it to the queue.
    else if (currentNode.left !== undefined) {
      console.log("from left check path", path);
      queue.push(grid[currentNode.left.x][currentNode.left.y]);
      console.log("pushed left Node");
    }
    // if currentNode has a left child node, add it to the queue.
    else if (currentNode.top !== undefined) {
      queue.push(grid[currentNode.top.x][currentNode.top.y]);
      console.log("pushed top Node");
    }

    // remove the currentNode from the queue.
    queue.shift();
  }
  console.log("Sorry, no such node found :(");
};

export default myAlg;
