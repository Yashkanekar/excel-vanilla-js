//setting a value property in the sheetDB for every cell after the user focuses out of that cell
for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activecell, cellProp] = getCellAndCellProp(address);
      let enteredData = activecell.innerText;

      if (enteredData === cellProp.value) return;
      // if data modifies remove P - C relation, formula empty, update children with new harcoded(modified) value
      cellProp.value = enteredData;
      removeChildFromParent(cellProp.formula);
      cellProp.formula = "";
      updateChildrenCells(address);
      // console.log(cellProp);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", async (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === "Enter" && inputFormula) {
    //If change in formula then break the old P-C relationship, evaluate new formula, add new P-C relnship
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    if (inputFormula !== cellProp.address)
      removeChildFromParent(cellProp.formula);


    addChildToGraphComponent(inputFormula, address);

    //checking for cycles in formula
    let cycleResponse = isGraphCyclic(graphComponentMatrix); // "cycleResponse has the array containing the row number and col no of the cell from where the cycle has started"
    if (cycleResponse) {
        // alert("Your formula is cyclic");

        let response =  confirm("Your formula is cyclic. Do you want to trace your path?")
        // as long as the user says ok to track the path again, keep on tracing the path
        while(response === true){
          await isGraphCyclicTracePath(graphComponentMatrix, cycleResponse);
          response =  confirm("Do you want to trace your path?")     
        }


        removeChildFromGraphComponent(inputFormula, address) // if we find a cycle then need to remove the p->c relationship
        return; //returning coz we dont wanna execute the following lines as there is a cycle in the formula
    }  

    let evaluatedValue = evaluateFormula(inputFormula);

    //call the function to set evaluated value inside the cell and the input formula inside the formula bar
    setCellUIandCellProp(evaluatedValue, inputFormula, address);
    addChildToParent(inputFormula);
    updateChildrenCells(address);
    // console.log(sheetDB);
  }
});

function addChildToGraphComponent(formula, childAddress) {
  let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);

  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
    //   console.log(prid, crid);
      graphComponentMatrix[prid][pcid].push([crid, ccid]); // push the children(dependent cells) into the parents graphcomponent address
    }
  }
}



function removeChildFromGraphComponent(formula, childAddress) {
  let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);

  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
      graphComponentMatrix[prid][pcid].pop(); // remove the children(dependent cells) into the parents graphcomponent address
    }
  }
}

// function to update all the children of the parent cell if the parent cell formula changes.
function updateChildrenCells(parentAddress) {
  let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
  let children = parentCellProp.children;

  // looping over each and every child in the parent's children array
  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProp] = getCellAndCellProp(childAddress);
    let childFormula = childCellProp.formula;

    let evaluatedValue = evaluateFormula(childFormula);
    setCellUIandCellProp(evaluatedValue, childFormula, childAddress);
    updateChildrenCells(childAddress); // recursively calling the function until all the children of childrens are updated
  }
}

function addChildToParent(formula) {
  let encodedFormula = formula.split(" ");
  let childAddress = addressBar.value; //as the current selected cell has its formula dependent on other cells, it is the child and the dependent cells is the parent.

  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
}

function removeChildFromParent(formula) {
  let encodedFormula = formula.split(" ");
  let childAddress = addressBar.value; //as the current selected cell has its formula dependent on other cells, it is the child and the dependent cells is the parent.

  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      let indx = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(indx, 1); // remove the child inde from the parent cell prop's children array.
    }
  }
}

function evaluateFormula(formula) {
  let encodedFormula = formula.split(" "); //splits the formula string into an array on the basis of empty space (" ")
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0); // get the ascii value of every element of the splitted formula string's array at the 0th index of the string
    if (asciiValue >= 65 && asciiValue <= 90) {
      //check to see if the first element of the string is a character value
      let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
      encodedFormula[i] = cellProp.value; //switch the value of the character to its actual stored value in the cell from the cellProp.value object]
    }
  }
  let decodedFormula = encodedFormula.join(" ");
  return eval(decodedFormula);
}

function setCellUIandCellProp(evaluatedValue, formula, address) {
  let [cell, cellProp] = getCellAndCellProp(address);

  //set cell UI
  cell.innerText = evaluateFormula(formula);

  //set data in sheetDB
  cellProp.formula = formula;
  cellProp.value = evaluatedValue;
}