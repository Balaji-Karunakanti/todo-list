const button = document.querySelector("#addBtn");
const text = document.querySelector("#itemInput");
const ul = document.querySelector("#itemList");
const tasks = loadTasksFromStorage(); // Load tasks from localStorage

// Render tasks on page load
tasks.forEach(task => renderItem(task));

function addItem() {
  const temp = text.value.trim().toLowerCase();

  if (temp === "") return;

  if (tasks.includes(temp)) {
    alert("The task is already listed to do");
    text.value = "";
    return;
  }

  tasks.push(temp);
  saveTasksToStorage(); 
  renderItem(temp);
  text.value = "";
}

function renderItem(temp) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn = document.createElement("button");

  span.textContent = temp;
  btn.textContent = "delete";

  span.addEventListener("click", () => {
    span.classList.toggle("completed");
    li.classList.toggle("completed");
  });

  btn.addEventListener("click", () => {
    const index = tasks.indexOf(temp);
    if (index !== -1) tasks.splice(index, 1);
    li.remove();
    saveTasksToStorage(); 
  });

  li.addEventListener("dblclick", () => {
    enableEdit(li, temp, btn);
  });

  li.appendChild(span);
  li.appendChild(btn);
  ul.appendChild(li);
}

// Add via button
button.addEventListener("click", addItem);

// Add via Enter key
text.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addItem();
  }
});

function enableEdit(li, temp, btn) {
  const originalText = temp;
  const input = document.createElement("input");
  input.type = "text";
  input.value = originalText;
  li.innerHTML = ""; // Clear li content
  li.appendChild(input);
  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const newText = input.value.trim().toLowerCase();

      if (newText === "") {
        alert("Task cannot be empty");
        li.textContent = originalText;
        li.appendChild(btn);
        return;
      }

      if (tasks.includes(newText) && newText !== originalText) {
        alert("Task already exists");
        li.textContent = originalText;
        li.appendChild(btn);
        return;
      }

      const index = tasks.indexOf(originalText);
      if (index !== -1) {
        tasks[index] = newText;
        saveTasksToStorage(); 
      }

      li.textContent = newText;
      li.appendChild(btn);
    }
  });
}

function saveTasksToStorage() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  const data = localStorage.getItem("myTasks");
  return data ? JSON.parse(data) : [];
}
