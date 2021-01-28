document.addEventListener("DOMContentLoaded", () => {

const input = document.getElementById("text-input");
const addButton = document.getElementById("add-button");
const viewSection = document.getElementById("view");
const selectedNum = document.getElementById("priority-selector");

function createContainer () {
     const container = document.createElement("div");
     container.classList.add("todo-container");
     return container;
}
function toDoItem (text) {
     const toDoItem = document.createElement("div");
     toDoItem.classList.add("todo-text");
     toDoItem.textContent = text;
     return toDoItem;
}
function getPriorrity(num) {
     const taskPriorrity = document.createElement("div");
     taskPriorrity.classList.add("todo-priority");
     taskPriorrity.textContent = num;
     return taskPriorrity;
}
function getTime(time = new Date().getTime()) {
     const createdAt = document.createElement("div"); 
     createdAt.classList.add("todo-created-at");
     createdAt.textContent = new Date(time).toISOString().slice(0, 19).replace('T', ' ');
     return createdAt;
}
let todoArray= JSON.parse(localStorage.getItem("my-todo"));
console.log(todoArray)
if (todoArray === null) {
     todoArray = [];
} 
 for (const data of todoArray) {
     const container =  createContainer();
     container.append(toDoItem(data.text));
     container.append(getPriorrity(data.priority));
     container.append(getTime(data.date));
     viewSection.append(container);
 }
addButton.addEventListener("click", () => {
     
     let task = {
      priority: selectedNum.value,
      text : input.value,
      date : new Date().getTime()
     };
     const container =  createContainer();
     container.append(toDoItem(task.text));
     container.append(getPriorrity(task.priority));
     container.append(getTime(task.date));
     viewSection.append(container);
     
     input.value = ""
     
     todoArray.push(task);
     localStorage.setItem("my-todo", JSON.stringify(todoArray));
     
});
});

// todoArray.push(JSON.parse(localStorage.getItem("my-todo")));
// let getBack = JSON.parse(localStorage.getItem("my-todo"))
// console.log(getBack);
// let counter = document.getElementById("counter");
// let numberOfTask = 0;
// let count = numberOfTask + " TODOs"
// counter.append(count);