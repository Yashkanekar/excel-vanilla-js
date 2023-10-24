for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`)
        cell.addEventListener("blur", (e)=>{
            let address = addressBar.value
            let [activecell, cellProp] = activeCell(address)
            let enteredData = activecell.innerText

            cellProp.value = enteredData
            console.log(cellProp);
        })
    }
}