// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  return todosJSON !== null ? JSON.parse(todosJSON) : [];
};

// Save todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//Render application todos based on filters
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  document.querySelector("#todos").innerHTML = "";

  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach((todo) => {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Remove todo by id
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  const divEl = document.createElement("div");
  const checkboxEl = document.createElement("input");
  const textEl = document.createElement("span");
  const btn = document.createElement("button");

  // Setup todo checkbox
  checkboxEl.setAttribute("type", "checkbox");
  checkboxEl.checked = todo.completed;
  divEl.appendChild(checkboxEl);
  checkboxEl.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup and append text element
  textEl.textContent = todo.text;
  divEl.appendChild(textEl);

  // Setup ans append a button
  btn.textContent = "x";
  divEl.appendChild(btn);

  btn.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return divEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
