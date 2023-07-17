import { makeAutoObservable } from "mobx";

export enum TodoStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Completed = "Completed",
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
}

class TodoStore {
  todos: Todo[] = [];
  nextId = 4;

  constructor() {
    makeAutoObservable(this);
    this.loadTodosFromLocalStorage(); // Load todos from local storage on store initialization
  }

  addTodo = (todo: Todo): void => {
    this.todos.push({ ...todo, id: this.nextId++ });
    this.saveTodosToLocalStorage(); // Save todos to local storage after adding a new todo
  };

  deleteTodo = (id: number): void => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodosToLocalStorage(); // Save todos to local storage after deleting a todo
  };

  toggleTodoStatus = (id: number): void => {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      const todo = this.todos[todoIndex];
      todo.status =
        todo.status === TodoStatus.ToDo
          ? TodoStatus.InProgress
          : todo.status === TodoStatus.InProgress
          ? TodoStatus.Completed
          : TodoStatus.ToDo;
      this.todos.splice(todoIndex, 1, todo);
      this.saveTodosToLocalStorage();
    }
  };

  editTodo = (
    id: number,
    updatedTitle: string,
    updatedDescription: string
  ): void => {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? { ...todo, title: updatedTitle, description: updatedDescription }
        : todo
    );

    this.saveTodosToLocalStorage();
  };

  saveTodosToLocalStorage = (): void => {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  };

  loadTodosFromLocalStorage = (): void => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
      this.nextId =
        this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1;
    }
  };
}

export default new TodoStore();
