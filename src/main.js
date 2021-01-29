document.addEventListener("DOMContentLoaded", () => {
     
const input = document.getElementById("text-input");
const addButton = document.getElementById("add-button");
const viewSection = document.getElementById("view");
const selectedNum = document.getElementById("priority-selector");
const sortButton = document.getElementById("sort-button");
const counter = document.getElementById("counter");
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

let  todoArray= JSON.parse(localStorage.getItem("my-todo"));
if  (todoArray === null) {
     todoArray = [];
};
for (const data of todoArray) {
     const container =  createContainer();
     container.append(toDoItem(data.text));
     container.append(getPriorrity(data.priority));
     container.append(getTime(data.date));
     viewSection.append(container);
};

function countTask () {
     let getLocalStorage = localStorage.getItem("my-todo");
     if  (getLocalStorage === null) {
         lengthOfTask = [];
     } else {
         lengthOfTask = JSON.parse(getLocalStorage);
     }
         counter.textContent = lengthOfTask.length
};

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
      
     counter.innerHTML = " ";
     countTask();
});
sortButton.addEventListener("click", () => {
     todoArray = todoArray.sort((a,b) => Number(b.priority) - Number(a.priority));
     viewSection.innerHTML = " ";

 for (let data of todoArray) {
     const container =  createContainer();
     container.append(toDoItem(data.text));
     container.append(getPriorrity(data.priority));
     container.append(getTime(data.date));
     viewSection.append(container);
 };
     
})
});
