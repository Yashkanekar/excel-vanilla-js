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
let graphComponentMatrix = []

for(let i = 0; i < row; i++){
    let row = [] // 100 rows
    for(let j = 0; j < col; j++){
        row.push([]) // push 26 arrays in each of the 100 rows which represents a cell
    }
    graphComponentMatrix.push(row) // push each of the 100 with 26 arrays (representing cells) inside the outer main array
}