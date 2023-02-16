const task = document.getElementById("addtask");
const addBtn = document.getElementById("add");
const tasks = document.querySelector(".tasks");
const removeBtn = document.querySelector(".del");

const arr = [];
// ======================

function deletedTask(list) {}

function taskMaker() {
  const newTask = document.createElement("div");
  const newTaskText = document.createElement("p");
  const removedTask = document.createElement("button");

  removedTask.textContent = "remove";

  newTask.classList.add("newTask");
  if (task.value === "") {
    alert("add somthing");
  } else {
    removedTask.classList.add("del");
    removedTask.setAttribute("id", task.value);
    newTaskText.innerHTML = task.value;
    newTask.appendChild(newTaskText);
    newTask.appendChild(removedTask);
    tasks.appendChild(newTask);

    task.value = "";

    arr.push(removedTask.id);

    newTask.addEventListener("click", (e) => {
      newTaskText.classList.toggle("lineThrough");
    });

    removedTask.addEventListener("click", (e) => {
      newTask.remove();
    });
  }

  console.log(arr);
}

addBtn.addEventListener("click", taskMaker);
