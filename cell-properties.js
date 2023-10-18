let sheetDB = []

for(let i =0; i < row; i++){
    let sheetRow = []
    for(let j = 0; j < col; j++){
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "#000000",  // Just for indication purpose,
        }
        sheetRow.push(cellProp)
    }
    sheetDB.push(sheetRow)
}
console.log(sheetDB)

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

let activeColorProp = "#d1d8e0"
let inActiveColorProp = "#ecf0f1"

//selecting the address bar to access its value for decoding the value stored in it in oreder to get the current cell rid and cid
// let addressBar = document.querySelector(".address-bar")

bold.addEventListener("click", (e)=>{
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)
    
    //modification
    cellProp.bold = !cellProp.bold // we have to change / make the value opposite of the previous when bold is clicked
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal" //if the propert is true then make font bold
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inActiveColorProp 

})

function activeCell(address) {
    let [rid,cid] = decodeRIDCIDFromAddress(address)
    // select the cell from the UI grid that has rid equal to tthe decoded rid and cid equal to decoded cid
    let cell = document.querySelector(`.cell[rid = "${rid}"][cid = "${cid}"]`)
    let cellProp = sheetDB[rid][cid]

    return [cell,cellProp] // this function returns both the active cell and its properties object
}

function decodeRIDCIDFromAddress(address){
    //suppose address -> A1
    console.log(address)
    let rid = Number(address.slice(1)-1) //if B1 slice-> ["A    ", "1"] -> 1-1 -> 0
    let cid = Number(address.charCodeAt(0)) - 65 // "A" -> 65

    return [rid,cid]
}

