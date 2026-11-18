const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");

let todos = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  todos.push({ id: Date.now(), title, done: false });
  input.value = "";
});
