// structure ->
// [
//       1  2  3  4  ...... 26
//     [ [],[],[],[],...... ,[]] 1
//     [ [],[],[],[],...... ,[]] 2
//     [ [],[],[],[],...... ,[]] 3
//     .                         .
//     .                         .
//     .                         .
//     [ [],[],[],[],...... ,[]] 100
// ]

// storage 2D matrix
let graphComponentMatrix = [];

for (let i = 0; i < row; i++) {
  let row = []; // 100 rows
  for (let j = 0; j < col; j++) {
    row.push([]); // push 26 arrays in each of the 100 rows which represents a cell
  }
  graphComponentMatrix.push(row); // push each of the 100 with 26 arrays (representing cells) inside the outer main array
}

function isGraphCyclic(graphComponentMatrix) {
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

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (visited[i][j] == false) {
        let response = dfsCycleDetection(
          graphComponentMatrix,
          i,
          j,
          visited,
          dfsVisited
        ); // this function will check for the cycle in dependency of each and every cell and then its children and so on

        if (response == true) return true;
      }
    }
  }
  return false;
}

// Start condition -> make visited and dfsVisited true
// exit condition -> make dfsVisited false
// if vis[i][j] is true then already visited no need to visit again
// if vis[i][j] is true and dfsVisited[i][j] == true ; then there is a cycle in formula
function dfsCycleDetection(
  graphComponentMatrix,
  srcr,
  srcc,
  visited,
  dfsVisited
) {
  //first performing start conditions make visited[i][j] as true and dfsVisited[i][j] as true

  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

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
      let response = dfsCycleDetection(
        graphComponentMatrix,
        neighbourRow,
        neighbourCol,
        visited,
        dfsVisited
      );
      if (response == true) return true; // found cycle so no need to explore more
    } else if (
      visited[neighbourRow][neighbourCol] === true &&
      dfsVisited[neighbourRow][neighbourCol] === true
    ) {
      //found cycle returnn true
      return true;
    }
  }

  // performing end condition dfsVisited[srcr][srcc] as false
  dfsVisited[srcr][srcc] = false;

  return false; // no condition met so no cycle found hence code reaches this line and here we return false as no cycle is found
}
