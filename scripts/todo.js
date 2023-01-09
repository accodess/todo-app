'use strict'

const todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: "",
};

renderTodos(todos, filters);

document.querySelector("#search-todo").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.todoName.value.trim() 

  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      //text: text,
      text,
      completed: false,
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.todoName.value = "";
  }  
});

document.querySelector("#hide-todo").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
