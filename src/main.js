document.addEventListener("DOMContentLoaded", () => {

const addButton = document.getElementById("add-button");
const input = document.getElementById("text-input");
const viewSection = document.getElementById("view");
const selectedNum = document.getElementById("priority-selector");
let div = document.createElement("div");
viewSection.append(div);

addButton.addEventListener("click", () => {
     let container = document.createElement("div");
     container.classList.add("todo-container");

     let toDoItem = document.createElement("div");
     toDoItem.classList.add("todo-text");
     toDoItem.textContent = input.value;

     let taskPriorrity = document.createElement("div");
     taskPriorrity.classList.add("todo-priority");


     input.value = ""

     });
});
