//setting a value property in the sheetDB for every cell after the user focuses out of that cell
for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`)
        cell.addEventListener("blur", (e)=>{
            let address = addressBar.value
            let [activecell, cellProp] = getCellAndCellProp(address)
            let enteredData = activecell.innerText

            cellProp.value = enteredData
            // console.log(cellProp);
        })
    }
}

let formulaBar = document.querySelector(".formula-bar")
formulaBar.addEventListener("keydown", (e)=> {

    let inputFormula = formulaBar.value
    if (e.key === "Enter" && inputFormula){
        let evaluatedValue = evaluateFormula(inputFormula)


        //call the function to set evaluated value inside the cell and the input formula inside the formula bar
        setCellUIandCellProp(evaluatedValue, inputFormula)
    }
})

function evaluateFormula(formula){

    let encodedFormula = formula.split(" ") //splits the formula string into an array on the basis of empty space (" ")
    for(let i =0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0); // get the ascii value of every element of the splitted formula string's array at the 0th index of the string
        if(asciiValue >= 65 && asciiValue <= 95){  //check to see if the first element of the string is a character value
            let [cell,cellProp] = getCellAndCellProp(encodedFormula[i])
            encodedFormula[i] = cellProp.value //switch the value of the character to its actual stored value in the cell from the cellProp.value object]
        }
    }
    let decodedFormula = encodedFormula.join(" ")
    return eval(decodedFormula)
}

function setCellUIandCellProp(evaluatedValue, formula){
    let address = addressBar.value
    let [cell, cellProp] = getCellAndCellProp(address)

    //set cell UI
    cell.innerText = evaluateFormula(formula)

    //set data in sheetDB
    cellProp.formula = formula
    cellProp.value = evaluatedValue
}