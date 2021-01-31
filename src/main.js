document.addEventListener("DOMContentLoaded", async() => {

const body = document.getElementById("body");     
const input = document.getElementById("text-input");
const addButton = document.getElementById("add-button");
const viewSection = document.getElementById("view");
const selectedNum = document.getElementById("priority-selector");
const clearBUtton = document.getElementById("clear");
const sortButton = document.getElementById("sort-button");
const counter = document.getElementById("counter");
const addTaskSound = document.getElementById("addTaskSound");

let  todoArray = await getPersistent();
if  (todoArray === null) {
     todoArray = [];
};
for (const data of todoArray) {
     viewSection.append(createDiv(data));
};

countTask();

function createContainer () {
     const container = document.createElement("div");
     container.classList.add("todo-container");
     return container;
};
function toDoItem (text) {
     const toDoItem = document.createElement("div");
     toDoItem.classList.add("todo-text");
     toDoItem.textContent = text;
     return toDoItem;
};
function getPriorrity(num) {
     const taskPriorrity = document.createElement("div");
     taskPriorrity.classList.add("todo-priority");
     taskPriorrity.textContent = num;
     return taskPriorrity;
};
function getTime(time = new Date().getTime()) {
     const createdAt = document.createElement("div"); 
     createdAt.classList.add("todo-created-at");
     createdAt.textContent = new Date(time).toISOString().slice(0, 19).replace('T', ' ');
     return createdAt;
};
function createDeleteButton () {
     const deleteButton = document.createElement("button");
     deleteButton.innerText = "x";
     deleteButton.classList.add("delete-button");
     return deleteButton;
};
function createDiv (data) {
     const container =  createContainer();
     container.append(createDeleteButton());
     container.append(toDoItem(data.text));
     container.append(getPriorrity(data.priority));
     container.append(getTime(data.date));
     return container;
}
function countTask () {
   counter.textContent = todoArray.length
};

addButton.addEventListener("click", () => {
     
     let task = {
          priority: selectedNum.value,
          text : input.value,
          date : new Date().getTime()
     };
     viewSection.append(createDiv(task));
     
     input.value = ""
     
     todoArray.push(task);
     setPersistent(todoArray);    
     
     countTask();      
     addTaskSound.play();
});
sortButton.addEventListener("click", () => {
     todoArray = todoArray.sort((a,b) => Number(b.priority) - Number(a.priority));
     viewSection.innerHTML = " ";
     
     for (let data of todoArray) {
          viewSection.append(createDiv(data));
     };  
});
clearBUtton.addEventListener("click", () => { 
     const clientChoice = confirm("You sure you want to clear all?");
     if (clientChoice) {
     viewSection.innerHTML = " ";
     counter.textContent = 0;
     todoArray = [];
     setPersistent(todoArray);
     }
});

body.addEventListener("click", (event) => {
     if (event.target.className !== ("delete-button")) {
          return;
     } else {
          const containerArray = document.querySelectorAll(".todo-container");
          const index = Array.from(containerArray).indexOf(event.target.parentNode);
          event.target.parentNode.remove();
          todoArray.splice(index,1);
          countTask();
          setPersistent(todoArray);
     }
})

}) 
