let downloadBtn = document.querySelector(".download")
let openBtn = document.querySelector(".open")

downloadBtn.addEventListener("click", (e)=> {
  let jsonData = JSON.stringify([sheetDB, graphComponentMatrix])
  const file = new Blob([jsonData], {type: "application/json"});

  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "SheetData.json"
  a.click()
  
})
