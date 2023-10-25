let sheetDB = [];
//creating a sheetDB for storing every cell's properties
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
      value:"",
      formula:"",
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}
console.log(sheetDB);

//selectors
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inActiveColorProp = "#ecf0f1";

//selecting the address bar to access its value for decoding the value stored in it in oreder to get the current cell rid and cid
// let addressBar = document.querySelector(".address-bar")

//all these below event listeners are for the time when user changes the properties from the sheet actions bar then those changes will be applied to the cell as well as to the sheet actions bar.
bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  //modification
  cellProp.bold = !cellProp.bold; // we have to change / make the value opposite of the previous when bold is clicked
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //if the property is true then make font bold
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inActiveColorProp;
});

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  //modification
  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //if the property is true then make font italic
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inActiveColorProp;
});

underline.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  //modification
  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none"; //if the property is true then make font underlined
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inActiveColorProp;
});

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontSize = fontSize.value; // Data change
  cell.style.fontSize = cellProp.fontSize + "px";
  fontSize.value = cellProp.fontSize;
});
fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontFamily = fontFamily.value; // Data change
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});
fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.fontColor = fontColor.value; // Data change
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});
BGcolor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cellProp.BGcolor = BGcolor.value; // Data change
  cell.style.backgroundColor = cellProp.BGcolor;
  BGcolor.value = cellProp.BGcolor;
});

alignment.forEach((alignElem) => {
  alignElem.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue; // Data change in the sheetDB object
    cell.style.textAlign = cellProp.alignment; // UI change (1)

    switch (
      alignValue // UI change (2)
    ) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inActiveColorProp;
        rightAlign.style.backgroundColor = inActiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inActiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inActiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inActiveColorProp;
        centerAlign.style.backgroundColor = inActiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

let allCells = document.querySelectorAll(".cell");

// add the click event listener to attach properties from the cellProp object to each cell
for (let i = 0; i < allCells.length; i++) {
  addListenerToAttachCellProperties(allCells[i]);
}

//this function adds a click listener to a cell and attaches the cell properties to a cell from the cellProps object.
function addListenerToAttachCellProperties(cell) {
  cell.addEventListener("click", (e) => {
    let address = addressBar.value;
    const [rid, cid] = decodeRIDCIDFromAddress(address);
    const cellProp = sheetDB[rid][cid];

    //Apply properties to the cell container.
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor =
      cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
    cell.style.textAlign = cellProp.alignment;

    // Apply properties UI Props container (these changes will be applied to the sheet actions container bar)
    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inActiveColorProp;
    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inActiveColorProp;
    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inActiveColorProp;
    fontColor.value = cellProp.fontColor;
    BGcolor.value = cellProp.BGcolor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inActiveColorProp;
        rightAlign.style.backgroundColor = inActiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inActiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inActiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inActiveColorProp;
        centerAlign.style.backgroundColor = inActiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
}

function getCellAndCellProp(address) {
  let [rid, cid] = decodeRIDCIDFromAddress(address);
  // select the cell from the UI grid that has rid equal to tthe decoded rid and cid equal to decoded cid
  let cell = document.querySelector(`.cell[rid = "${rid}"][cid = "${cid}"]`);
  let cellProp = sheetDB[rid][cid];

  return [cell, cellProp]; // this function returns both the active cell and its properties object
}

function decodeRIDCIDFromAddress(address) {
  //suppose address -> A1
  // console.log(address)
  let rid = Number(address.slice(1) - 1); //if B1 slice-> ["A    ", "1"] -> 1-1 -> 0
  let cid = Number(address.charCodeAt(0)) - 65; // "A" -> 65

  return [rid, cid];
}



//flow->
// first create sheetDB and assign it to every cell
// add properties and default values to those properties in the sheetDB objects
// add click event listeners to the sheet actions bar container and reflect those changes both in the cell UI and sheet actions bar and also in the SheetDB object
// add click event listeners to each and every cell in order to reflect the changes made to that cell in the ui and inside the Sheet actions bar container