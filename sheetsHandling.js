let activeSheetColor = "#ced6e0";

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
  sheet.scrollIntoView()


  createSheetDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet); // this sheet takes in the above created sheet and makes that sheet active in the UI
  handleSheetRemove(sheet);
  sheet.click();
});

function handleSheetDB(sheetIndex) {
  //the sheetDb and graphComponent variables defined insde the cell properties file store the current sheet data and all the further functions act upo the data stored in these function so we are changing the data inside this variable in this function
  sheetDB = collectedSheetDB[sheetIndex];
  graphComponentMatrix = collectedGraphComponentMatrix[sheetIndex];
}

// this function clicks oon every single cell programatically so that when we click we have an event listener added to the cells which update their props based on the currrent value inside the sheetDB and GraphComponentMatrix
function handleSheetProperties() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
      cell.click();
    }
  }
  //click on the first cell (after updating the properties of all the new cells in the sheet )to get its value inside the address bar
  let firstCell = document.querySelector(".cell");
  firstCell.click();
}

function handleSheetRemove(sheet) {
  sheet.addEventListener("mousedown", (e) => {
    if (e.button !== 2) return; //only add event on rightclick of mouse

    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    if (allSheetFolders.length === 1) {
      alert("You must have atleast one sheet");
      return;
    }

    let response = confirm(
      "You are about to remove you sheet permanently! Are you sure ?"
    );
    if (response === false) return;
    let sheetIndex = Number(sheet.getAttribute("id"));

    //removal of sheet from db
    collectedSheetDB.splice(sheetIndex, 1);
    collectedGraphComponentMatrix.splice(sheetIndex, 1);

    //removal of sheet from UI
    handleSheetUIRemoval(sheet);

    //by default assign DB to sheet 1
    sheetDB = collectedSheetDB[0];
    graphComponentMatrix = collectedGraphComponentMatrix[0];

    handleSheetProperties(); // this functionsets the vaules of the cells in the sheet ui and also updates the values inside the sheetDB and GraphComponent
  });
}

function handleSheetUIRemoval(sheet) {
  sheet.remove();
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].setAttribute("id", i);
    let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
    sheetContent.innerText = `Sheet ${i + 1}`;
  }
  allSheetFolders[0].style.backgroundColor = activeSheetColor;
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", () => {
    let sheetIdx = Number(sheet.getAttribute("id")); // gets the id of the sheet which is assigned when creating a new sheet. Using this Id we can find this particulars sheet's data inside of the big array which contains all the sheets
    handleSheetDB(sheetIdx); // this function takes in the sheetIdx and activates the sheet inside of the sheetDB
    handleSheetProperties();
    handleSheetUI(sheet);
  });
}

//show the color of the selected sheet in the sheets folder cont beolow the grid
function handleSheetUI(sheet) {
  let allSheetFolders = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolders.length; i++) {
    allSheetFolders[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = activeSheetColor;
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
