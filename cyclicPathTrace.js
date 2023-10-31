// for delay and wait
function colorPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
  let [srcr, srcc] = cycleResponse; // getting the row no and col no of the cell from where cycle starts

  let visited = []; // Node(cell) visit trace
  let dfsVisited = []; // stack visit trace

  for (let i = 0; i < row; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];
    // initializing all the default visited values of all the cells in visitedRow and dfsVisitedRow as false
    for (let j = 0; j < col; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  let response = await dfsCycleDetectionTracePath(
    graphComponentMatrix,
    srcr,
    srcc,
    visited,
    dfsVisited
  );

  if (response === true) return Promise.resolve(true);

  return Promise.resolve(false);
}

// coloring all the cells for tracking path
async function dfsCycleDetectionTracePath(
  graphComponentMatrix,
  srcr,
  srcc,
  visited,
  dfsVisited
) {
  //first performing start conditions make visited[i][j] as true and dfsVisited[i][j] as true
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  let cell = document.querySelector(`.cell[rid = "${srcr}"][cid = "${srcc}"]`);
  cell.style.backgroundColor = " lightblue";
  await colorPromise(); // wait for 1 second

  // A1 -> [ [0,1],[1,0],[5,10],[4,9]... ]
  //now looping over every children of the particular cell which is passed into the function
  for (
    let children = 0;
    children < graphComponentMatrix[srcr][srcc].length;
    children++
  ) {
    let [neighbourRow, neighbourCol] =
      graphComponentMatrix[srcr][srcc][children]; // getting the row no and col no of each dependency inside of the child

    // this condition means that the node hasnt been visited so we need to visit it and its children so if this condition is true then run the cycleDetection function for its inner children
    if (visited[neighbourRow][neighbourCol] === false) {
      let response = await dfsCycleDetectionTracePath(
        graphComponentMatrix,
        neighbourRow,
        neighbourCol,
        visited,
        dfsVisited
      );
      if (response == true) {
        cell.style.backgroundColor = "transparent";
        await colorPromise();
        return Promise.resolve(true); // found cycle so no need to explore more
      }
    } else if (
      visited[neighbourRow][neighbourCol] === true &&
      dfsVisited[neighbourRow][neighbourCol] === true
    ) {
      let cyclicCell = document.querySelector(
        `.cell[rid = "${neighbourRow}"][cid = "${neighbourCol}"]`
      );

      cyclicCell.style.backgroundColor = "lightsalmon";
      await colorPromise();
      cyclicCell.style.backgroundColor = "transparent";
      await colorPromise();
      //found cycle return true

      cell.style.backgroundColor = "transparent";
      await colorPromise();
      return Promise.resolve(true);
    }
  }

  // performing end condition dfsVisited[srcr][srcc] as false
  dfsVisited[srcr][srcc] = false;

  return Promise.resolve(false); // no condition met so no cycle found hence code reaches this line and here we return false as no cycle is found
}
