const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");

let todos = [];

window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("todos");
  if (stored) {
    todos = JSON.parse(stored);
    renderTodos();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  const newTodo = {
    id: Date.now(),
    text: text,
    done: false,
  };

  todos.push(newTodo);
  input.value = "";

  saveAndRender();
});

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const span = document.createElement("span");
    span.textContent = todo.text;

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.classList.add("remove-btn");
    btn.addEventListener("click", () => removeTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);

    list.appendChild(li);
  });

  updateCounter();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  saveAndRender();
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveAndRender();
}

function updateCounter() {
  const total = todos.length;
  const completed = todos.filter((t) => t.done).length;
  counter.textContent = `${total} zadań • ${completed} ukończonych`;
}

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
