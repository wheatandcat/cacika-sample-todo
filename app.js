const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const count = document.getElementById("todo-count");

const STORAGE_KEY = "cacika-sample-todos";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

let todos = load();
let filter = "all";

const filters = {
  all: () => true,
  active: (todo) => !todo.done,
  done: (todo) => todo.done,
};

function render() {
  list.innerHTML = "";
  for (const todo of todos.filter(filters[filter])) {
    const li = document.createElement("li");
    li.classList.toggle("done", todo.done);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      render();
    });

    const title = document.createElement("span");
    title.textContent = todo.title;

    const remove = document.createElement("button");
    remove.textContent = "削除";
    remove.addEventListener("click", () => {
      if (!confirm(`「${todo.title}」を削除しますか？`)) return;
      todos = todos.filter((t) => t.id !== todo.id);
      render();
    });

    li.append(checkbox, title, remove);
    list.appendChild(li);
  }
  const remaining = todos.filter((todo) => !todo.done).length;
  count.textContent = `残り ${remaining} 件`;
  save();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  todos.push({ id: Date.now(), title, done: false });
  input.value = "";
  render();
});

document.querySelectorAll("#todo-filter button").forEach((button) => {
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    document
      .querySelectorAll("#todo-filter button")
      .forEach((b) => b.classList.toggle("active", b === button));
    render();
  });
});

render();
