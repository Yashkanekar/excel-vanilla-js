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
    return eval(formula)
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