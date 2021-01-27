document.addEventListener("DOMContentLoaded", () => {

const addButton = document.getElementById("add-button");
const input = document.getElementById("text-input");
const viewSection = document.getElementById("view");
const selectedNum = document.getElementById("priority-selector");

addButton.addEventListener("click", (event) => {
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

     });
});

