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
function toDoItem (data ,text) {
     const toDoItem = document.createElement("div");
     toDoItem.classList.add("todo-text");
     toDoItem.textContent = text;
     if (data.done) {
          toDoItem.classList.add("done-text");
     };
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
function createEditButton () {
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("edit-button");
  return editButton ;
};
function createMinusButton () {
     const minusButton = document.createElement("button");
     minusButton.innerText = "-";
     minusButton.classList.add("minus-button");
     return minusButton;
}
function createPlusButton () {
     const plusButton = document.createElement("button");
     plusButton.innerText = "+";
     plusButton.classList.add("plus-button");
     return plusButton;
}
function createCheckBox (data) {
     const checkBox = document.createElement("input");
     checkBox.setAttribute("type", "checkbox");
     checkBox.classList.add("check-box");
     if (data.done) {
          checkBox.checked = true;
     }
     return checkBox;
}
function createDiv (data) {
     const container =  createContainer();
     container.append(createCheckBox(data));
     container.append(createMinusButton());
     container.append(getPriorrity(data.priority));
     container.append(createPlusButton());
     container.append(toDoItem(data, data.text));
     container.append(getTime(data.date));
     container.append(createDeleteButton());
     container.append(createEditButton());
     if (data.done) {
          container.classList.add("done");
     }
     return container;
}
function countTask () {
   counter.textContent = todoArray.length;
};

addButton.addEventListener("click", () => {
     
     addTaskSound.play();

     let task = {
          priority: selectedNum.value,
          text : input.value,
          date : new Date().getTime(),
          done : false
     };
     viewSection.append(createDiv(task));
     
     input.value = ""
     
     todoArray.push(task);
     setPersistent(todoArray);    
     
     countTask();      
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

     switch (event.target.className) {
          case ("delete-button") : 

               const containerArray = document.querySelectorAll(".todo-container");
               const index = Array.from(containerArray).indexOf(event.target.parentNode);
               event.target.parentNode.remove();
               todoArray.splice(index, 1);
               countTask();
               setPersistent(todoArray);
               break;
     
          case ("edit-button") :

               const editTask = document.createElement("input");
               const saveChange = document.createElement("button");
               saveChange.textContent = "Save";
               event.target.hidden = true ;
               event.target.parentNode.append(editTask);
               event.target.parentNode.append(saveChange);
              
               saveChange.addEventListener("click", () => {
               const containerArray = document.querySelectorAll(".todo-container");
               const index = Array.from(containerArray).indexOf(event.target.parentNode);
               const container = event.target.parentNode;
               const text = container.querySelector(".todo-text");

               text.innerText = editTask.value;

               editTask.hidden = true;
               saveChange.hidden = true ;
               event.target.hidden = false ;
                    
               todoArray[index].text = editTask.value;
               setPersistent(todoArray);

                    editTask.value = "";
               });
               break;

          case ("minus-button") :  

               let containerMinus = document.querySelectorAll(".todo-container"); // select all containers
               let spotMinus = Array.from(containerMinus).indexOf(event.target.parentNode); // get the index of target to take he info
               let numMinus = Number(todoArray[spotMinus].priority); // change the value to number
               if (numMinus === 1) break;
               numMinus --;

               let containerForMinus = event.target.parentNode; // update 
               let priority = containerForMinus.querySelector(".todo-priority");
               priority.innerText = numMinus ;

               todoArray[spotMinus].priority = numMinus;
               setPersistent(todoArray);

               break;
          case ("plus-button") :  

               let containerPlus = document.querySelectorAll(".todo-container");
               let spotPlus = Array.from(containerPlus).indexOf(event.target.parentNode);
               let numPlus = Number(todoArray[spotPlus].priority);
               if (numPlus === 5) break;
               numPlus ++;

               let containerForPlus = event.target.parentNode;
               let priorityPlus = containerForPlus.querySelector(".todo-priority");
               priorityPlus.innerText = numPlus;

               todoArray[spotPlus].priority = numPlus;
               setPersistent(todoArray);

               break;     
          case ("check-box") :

               if(event.target.checked === true) {

               event.target.parentNode.classList.add("done");
               const textClass = event.target.parentNode.querySelector(".todo-text");
               textClass.classList.add("done-text");  

               let containerDone = document.querySelectorAll(".todo-container");
               let spotDone =  Array.from(containerDone).indexOf(event.target.parentNode);
               todoArray[spotDone].done = true;
               setPersistent(todoArray);
               } else {

                event.target.parentNode.classList.remove("done");
                const unTextClass = event.target.parentNode.querySelector(".todo-text");
                unTextClass.classList.remove("done-text");
                let containerUnDone = document.querySelectorAll(".todo-container");
                let spotUnDone =  Array.from(containerUnDone).indexOf(event.target.parentNode);

                todoArray[spotUnDone].done = false;
                setPersistent(todoArray);    
               }
     };
   
});

});
