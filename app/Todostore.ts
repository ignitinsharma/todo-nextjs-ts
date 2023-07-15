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
  }

  addTodo = (todo: Todo): void => {
    this.todos.push({ ...todo, id: this.nextId++ });
  };

  deleteTodo = (id: number): void => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
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
  };
}

export default new TodoStore();
