let row = 100;
let col = 26;

console.log("hello")

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let gridCont = document.querySelector(".cells-cont")

for (let i = 0; i < row; i++) {
  let addressCol = document.createElement("div");
  addressCol.setAttribute("class", "address-col");
  addressCol.innerText = i + 1;
  addressColCont.appendChild(addressCol);
}

for (let i = 0; i < row; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = String.fromCharCode(65+i);
  addressRowCont.appendChild(addressRow);
}

for (let i = 0; i < row; i++ ){

  const rowCont = document.createElement("div")
  rowCont.setAttribute("class", "row-cont")
  for (let j = 0; j < col; j++){
    const cell = document.createElement("div")
    cell.setAttribute("class", "cell")
    rowCont.appendChild(cell)
  }

  gridCont.appendChild(rowCont)
}