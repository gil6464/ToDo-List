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

if (localStorage.getItem("todoArray") === null) {
     todoArray= [];
 } else {
      todoArray.push(JSON.parse(localStorage))
 }


addButton.addEventListener("click", () => {

const container = document.createElement("div");
container.classList.add("todo-container");

const toDoItem = document.createElement("div");
toDoItem.classList.add("todo-text");
toDoItem.textContent = input.value;

const taskPriorrity = document.createElement("div");
taskPriorrity.classList.add("todo-priority");
taskPriorrity.textContent = selectedNum.value;

const createdAt = document.createElement("div");
createdAt.classList.add("todo-created-at");
createdAt.textContent = new Date().toISOString().slice(0, 19).replace('T', ' ');

     container.append(toDoItem);
     container.append(taskPriorrity);
     container.append(createdAt);
     viewSection.append(container);
     
     input.value = ""
     numberOfTask ++;
     
     // const sortButton = document.getElementById("sort-button");
     // sortButton.addEventListener("click", () =>{
          // const task = document.querySelectorAll(".todo-priority") 
          // console.log(task.textContent)
          // })
          
     });
     
});