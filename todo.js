const todos = [
  {
    text: "Buy food",
    completed: true,
  },
  {
    text: "Clean house",
    completed: false,
  },
  {
    text: "Do exercise",
    completed: false,
  },
  {
    text: "Finish book",
    completed: false,
  },
];

const filters = {
  searchText: "",
};

const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector('#todos').innerHTML = ''

  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document.querySelector("#todos").appendChild(summary);  

  filteredTodos.forEach(function (todo) {
    const p = document.createElement("p");
    p.textContent = todo.text;
    document.querySelector("#todos").appendChild(p);
  });
};

renderTodos(todos, filters);

document.querySelector("#add-todo").addEventListener("click", function (e) {
  e.target.textContent = "Add New ToDo";
  console.log("Add a new todo...");
});

document.querySelector("#new-todo").addEventListener("input", function (e) {
  console.log("Add a new todo...");
});

document.querySelector("#search-todo").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});
