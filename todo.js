const todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: "",
};

renderTodos(todos, filters);

document.querySelector("#search-todo").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#todo-form").addEventListener("submit", function (e) {
  e.preventDefault();
  todos.push({
    text: e.target.elements.todoName.value,
    completed: false,
  });
  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.todoName.value = "";
});

document.querySelector("#hide-todo").addEventListener("change", function (e) {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
