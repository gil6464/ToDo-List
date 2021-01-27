document.addEventListener("DOMContentLoaded", ()=> {

const addButton = document.getElementById("add-button");
const input = document.getElementById("text-input");
const viewSection = document.getElementById("view");
let div = document.createElement("div");

addButton.addEventListener("click", () => {
     div.append(input.value);
     viewSection.append(div);
     input.value = ""
          
     });

})
