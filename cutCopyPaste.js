let rangeStorage = []; // array to store the range i.e. start and end cell's rid and cid
let ctrlKey;

document.addEventListener("keydown", (e) => {
  ctrlKey = e.ctrlKey; //stores the value as true/false depending on whether the ctrl key is pressed or not
});

document.addEventListener("keyup", (e) => {
  ctrlKey = e.ctrlKey; //stores the value as true/false depending on whether the ctrl key is pressed or not
});

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
    handleSelectedCells(cell);
    rangeStorage = [];
  }
}

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");
console.log(copyBtn);

function handleSelectedCells(cell) {
  cell.addEventListener("click", (e) => {
    if (!ctrlKey) return;
    if (rangeStorage.length >= 2) {
      defaultSelectedCellsUI();
      rangeStorage = [];
    }

    //UI styling
    cell.style.border = " 3px solid #218c74";

    let rid = Number(cell.getAttribute("rid"));
    let cid = Number(cell.getAttribute("cid"));

    rangeStorage.push([rid, cid]);
  });
}

function defaultSelectedCellsUI() {
  for (let i = 0; i < rangeStorage.length; i++) {
    // loop over both the cells of the rangeStrogae array and perform the necesary changes
    let cell = document.querySelector(
      `.cell[rid = "${rangeStorage[i][0]}"][cid = "${rangeStorage[i][1]}"]`
    );
    cell.style.border = "1px solid lightgrey";
  }
}

let copyData = [];
copyBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;
  copyData = [];

  let strow = rangeStorage[0][0];
  let endrow = rangeStorage[1][0];
  let stcol = rangeStorage[0][1];
  let endcol = rangeStorage[1][1];
  // console.log("clicked")

  for (let i = strow; i <= endrow; i++) {
    let copyRow = [];
    for (let j = stcol; j <= endcol; j++) {
      let cellProp = sheetDB[i][j];
      copyRow.push(cellProp);
    }
    copyData.push(copyRow);
  }
  defaultSelectedCellsUI();
  console.log(copyData);
});

pasteBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;

  let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
  let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

  //find the target cells
  let address = addressBar.value;
  let [strow, stcol] = decodeRIDCIDFromAddress(address); //get the value of the starting cell (from where th data should be pasted) from the address bar

  // r -> copy data row; c-> copyData array's column
  for (let i = strow, r = 0; i <= strow + rowDiff; i++, r++) {
    for (let j = stcol, c = 0; j <= stcol + colDiff; j++, c++) {
      let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
      if (!cell) continue; // if there is no cell with the given rid and cid(cell gets out of range ) then we should not care about it paste upto which cells we can and ignore the rest

      // DB
      let data = copyData[r][c]; // get tha data to be copied from the copy arrray
      let cellProp = sheetDB[i][j]; // get the cell property (of the selected cells where the data has to be copied) from the DB

      //assign the properties of the copied cells to the cells inside the DB
      cellProp.value = data.value;
      cellProp.bold = data.bold;
      cellProp.italic = data.italic;
      cellProp.underline = data.underline;
      cellProp.fontColor = data.fontColor;
      cellProp.fontSize = data.fontSize;
      cellProp.fontFamily = data.fontFamily;
      cellProp.BGcolor = data.BGcolor;
      cellProp.alignment = data.alignment;

      //UI

      // we have updated the sheetDB now we have to update the cell  UI
      cell.click(); //click on the cell as we have a on click listener on every cell in the grid which then sets the property on the cell from the sheetDB
    }
  }
});

cutBtn.addEventListener("click", () => {
  if (rangeStorage.length < 2) return;

  let strow = rangeStorage[0][0];
  let endrow = rangeStorage[1][0];
  let stcol = rangeStorage[0][1];
  let endcol = rangeStorage[1][1];

  for (let i = strow; i <= endrow; i++) {
    for (let j = stcol; j <= endcol; j++) {
      let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);

      //DB
      let cellProp = sheetDB[i][j];
      cellProp.value = "";
      cellProp.bold = false;
      cellProp.italic = false;
      cellProp.underline = false;
      cellProp.fontSize = 14;
      cellProp.fontFamily = "monospace";
      cellProp.fontColor = "#000000";
      cellProp.BGcolor = "#000000";
      cellProp.alignment = "left";

      //UI

      cell.click();
    }
  }
  defaultSelectedCellsUI();
});
