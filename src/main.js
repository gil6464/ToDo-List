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

     let container = document.querySelectorAll(".todo-container");
     let target = event.target.parentNode;
     let indexOfTarget =  Array.from(container).indexOf(event.target.parentNode);
     const text = target.querySelector(".todo-text");

     switch (event.target.className) {


          case ("delete-button") : 
            
               event.target.parentNode.remove();
               todoArray.splice(indexOfTarget, 1);
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
               const text = target.querySelector(".todo-text");

               text.innerText = editTask.value;

               editTask.hidden = true;
               saveChange.hidden = true ;
               event.target.hidden = false ;
                    
               todoArray[indexOfTarget].text = editTask.value;
               setPersistent(todoArray);

                    editTask.value = "";
               });
               break;

          case ("minus-button") :  

               let numMinus = Number(todoArray[indexOfTarget].priority); 
               if (numMinus === 1) break;
               numMinus --;

               let priority = target.querySelector(".todo-priority");
               priority.innerText = numMinus ;

               todoArray[indexOfTarget].priority = numMinus;
               setPersistent(todoArray);

               break;
          case ("plus-button") :  

               let numPlus = Number(todoArray[indexOfTarget].priority);
               if (numPlus === 5) break;
               numPlus ++;

               let priorityPlus = target.querySelector(".todo-priority");
               priorityPlus.innerText = numPlus;

               todoArray[indexOfTarget].priority = numPlus;
               setPersistent(todoArray);

               break;     
          case ("check-box") :

               if(event.target.checked === true) {

               event.target.parentNode.classList.add("done");
               text.classList.add("done-text");  

               todoArray[indexOfTarget].done = true;
               setPersistent(todoArray);
               } else {

                event.target.parentNode.classList.remove("done");
                text.classList.remove("done-text");

                todoArray[indexOfTarget].done = false;
                setPersistent(todoArray);    
               }
     };
   
});

});
