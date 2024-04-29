import {v4 as uuidv4} from "../_snowpack/pkg/uuid.js";
const list = document.querySelector("#list");
const form = document.querySelector(".new-task-form");
const input = document.querySelector(".new-task-title");
const tasks = loadTasks();
tasks.forEach(addNewTask);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null)
    return;
  const newTask = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  addNewTask(newTask);
  input.value = "";
});
function addNewTask(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const taskTitle = document.createElement("div");
  const checkBox = document.createElement("input");
  const deleteBtn = document.createElement("button");
  checkBox.className = "check-box";
  deleteBtn.className = "deleteBtn material-symbols-outlined";
  deleteBtn.textContent = "delete";
  taskTitle.textContent = task.title;
  taskTitle.className = "taskTitle";
  checkBox.type = "checkbox";
  checkBox.checked = task.completed;
  checkBox.addEventListener("change", () => {
    task.completed = checkBox.checked;
    saveTasks();
    checkTaskCompletion();
  });
  checkTaskCompletion();
  label.append(checkBox, taskTitle, deleteBtn);
  deleteBtn.addEventListener("click", () => {
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      saveTasks();
      item.remove();
    }
  });
  item.append(label);
  list?.append(item);
  function checkTaskCompletion() {
    const lime = "#b3d23e";
    const blue = "#84d5ed";
    if (checkBox.checked || task.completed) {
      item.style.background = lime;
    } else {
      item.style.background = blue;
    }
  }
}
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null)
    return [];
  return JSON.parse(taskJSON);
}
