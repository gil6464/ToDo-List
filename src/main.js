document.addEventListener("DOMContentLoaded", () => {

const addButton = document.getElementById("add-button");
const input = document.getElementById("text-input");
const viewSection = document.getElementById("view");
const selectedNum = document.getElementById("priority-selector");

// let counter = document.getElementById("counter");
// let numberOfTask = 0;
// let count = numberOfTask + " TODOs"
// counter.append(count);
let todoArray;

//  if (localStorage.getItem("todoArray") === null) {
     // localStorage.setItem("todoArray", " ")
     // todoArray= [];
//  } else {
     // todoArray = (JSON.parse(localStorage.getItem("todoArray")));
//  }

 function getTime() {
     const createdAt = document.createElement("div"); 
     createdAt.classList.add("todo-created-at");
     createdAt.textContent = new Date().toISOString().slice(0, 19).replace('T', ' ');
     return createdAt;
 }
 
 function getPriorrity(selectedNum) {
     const taskPriorrity = document.createElement("div");
     taskPriorrity.classList.add("todo-priority");
     taskPriorrity.textContent = selectedNum.value;
     return taskPriorrity;
 }
 function toDoItem (input) {
     const toDoItem = document.createElement("div");
     toDoItem.classList.add("todo-text");
     toDoItem.textContent = input.value;
     return toDoItem;
 }

addButton.addEventListener("click", () => {

const container = document.createElement("div");
container.classList.add("todo-container");

// const toDoItem = document.createElement("div");
// toDoItem.classList.add("todo-text");
// toDoItem.textContent = input.value;

     container.append(toDoItem(input));
     container.append(getPriorrity(selectedNum));
     container.append(getTime());
     viewSection.append(container);
     
     input.value = ""
     // numberOfTask ++;
     
     // const sortButton = document.getElementById("sort-button");
     // sortButton.addEventListener("click", () =>{
          // const task = document.querySelectorAll(".todo-priority") 
          // console.log(task.textContent)
          // })
          
     });
     
});