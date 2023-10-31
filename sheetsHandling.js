let sheetsFolderCont = document.querySelector(".sheets-folder-cont");
let addSheetButton = document.querySelector(".sheet-add-icon");
addSheetButton.addEventListener("click", () => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetFolders.length);

  sheet.innerHTML = `
    <div class = "sheet-content"> Sheet ${allSheetFolders.length + 1}</div>
  `;

  sheetsFolderCont.appendChild(sheet);
  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet); // this sheet takes in the above created sheet and makes that sheet active in the UI
});

function handleSheetDB(sheetIndex) {
  //the sheetDb and graphComponent variables defined insde the cell properties file store the current sheet data and all the further functions act upo the data stored in these function so we are changing the data inside this variable in this function
  sheetDB = collectedSheetDB[sheetIndex];
  graphComponentMatrix = collectedGraphComponent[sheetIndex];
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", () => {
    let sheetIdx = Number(sheet.getAttribute("id")); // gets the id of the sheet which is assigned when creating a new sheet. Using this Id we can find this particulars sheet's data inside of the big array which contains all the sheets
    handleSheetDB(sheetIdx); // this function takes in the sheetIdx and activates the sheet inside of the sheetDB
  });
}

function createSheetDB() {
  let sheetDB = [];
  for (let i = 0; i < row; i++) {
    let sheetRow = [];
    for (let j = 0; j < col; j++) {
      let cellProp = {
        bold: false,
        italic: false,
        underline: false,
        alignment: "left",
        fontFamily: "monospace",
        fontSize: "14",
        fontColor: "#000000",
        BGcolor: "#000000", // Just for indication purpose,
        value: "",
        formula: "",
        children: [],
      };
      sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
  }
  collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
  let graphComponentMatrix = [];

  for (let i = 0; i < row; i++) {
    let row = []; // 100 rows
    for (let j = 0; j < col; j++) {
      row.push([]); // push 26 arrays in each of the 100 rows which represents a cell
    }
    graphComponentMatrix.push(row); // push each of the 100 with 26 arrays (representing cells) inside the outer main array
  }

  collectedGraphComponentMatrix.push(graphComponentMatrix);
}
