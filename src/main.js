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
     
     
     function createContainer () {
          const container = document.createElement("div");
          container.classList.add("todo-container");
          return container;
     }
     function toDoItem (input) {
          const toDoItem = document.createElement("div");
          toDoItem.classList.add("todo-text");
          toDoItem.textContent = input.value;
          return toDoItem;
     }
     
     function getPriorrity(selectedNum) {
          const taskPriorrity = document.createElement("div");
          taskPriorrity.classList.add("todo-priority");
          taskPriorrity.textContent = selectedNum.value;
          return taskPriorrity;
     }
     function getTime() {
          const createdAt = document.createElement("div"); 
          createdAt.classList.add("todo-created-at");
          createdAt.textContent = new Date().toISOString().slice(0, 19).replace('T', ' ');
          return createdAt;
     }
     
     addButton.addEventListener("click", () => {
          
          const container =  createContainer();
          container.append(toDoItem(input));
          container.append(getPriorrity(selectedNum));
          container.append(getTime());
          viewSection.append(container);
          
          input.value = ""
          if (typeof(Storage) !== "null") {
               todoArray= [];
               todoArray.push(toDoItem(input.value));
               console.log(todoArray.value);
               // const stringTodo = toDoItem(input)
               // localStorage.setItem("item", stringTodo);
          }
     
          // console.log(localStorage.getItem("item"));

          // numberOfTask ++;
          
          // const sortButton = document.getElementById("sort-button");
          // sortButton.addEventListener("click", () =>{
               // const task = document.querySelectorAll(".todo-priority") 
               // console.log(task.textContent)
               // })
          });
     });
     //  if (localStorage.getItem("todoArray") === null) {
          // localStorage.setItem("todoArray", " ")
          //  } else {
               // todoArray = (JSON.parse(localStorage.getItem("todoArray")));
               //  }