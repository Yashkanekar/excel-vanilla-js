let row = 100;
let col = 26;

console.log("hello")

let addressColCont = document.querySelector(".address-col-cont");
for (let i = 0; i < row; i++) {
  let addressCol = document.createElement("div");
  addressCol.setAttribute("class", "address-col");
  addressCol.innerText = i + 1;
  addressColCont.appendChild(addressCol);
}

let addressRowCont = document.querySelector(".address-row-cont");
for (let i = 0; i < row; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = String.fromCharCode(65+i);
  addressRowCont.appendChild(addressRow);
}

let gridCont = document.querySelector(".cells-cont")
for (let i = 0; i < 100; i++ ){
  for (let j = 0; j < 26; j++){
    const individualCell = document.createElement("div")
    individualCell.setAttribute("class", "cell")
    gridCont.appendChild(individualCell)
  }
}