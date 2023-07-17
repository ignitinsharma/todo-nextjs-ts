"use client";
import { observer } from "mobx-react";
import { ChangeEvent, useEffect, useState } from "react";
import todoStore, { Todo, TodoStatus } from "./Todostore";

const TodoPage = (): JSX.Element => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");
  const [toggleInput, setToggleInput] = useState<boolean>(false);

  const [newTodo, setNewTodo] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };
  const handleAddTodo = (id: any): void => {
    if (newTodoTitle.trim() && newTodoDescription.trim()) {
      todoStore.addTodo({
        id: id,
        title: newTodoTitle,
        description: newTodoDescription,
        status: TodoStatus.ToDo,
      });
      setNewTodoTitle("");
      setNewTodoDescription("");
    }
  };

  const handleDeleteTodo = (id: number): void => {
    todoStore.deleteTodo(id);
  };

  const handleToggleTodo = (id: number): void => {
    todoStore.toggleTodoStatus(id);
  };

  useEffect(() => {
    return () => {
      todoStore.todos = [];
      todoStore.nextId = 1;
    };
  }, []);

  const handleSubmitUpdate = (id: any): void => {
    todoStore.addTodo({
      id: id,
      title: newTodo.title,
      description: newTodo.description,
      status: TodoStatus.ToDo,
    });
  };

  const handleToggleState = (): void => {
    setToggleInput(!toggleInput);
  };

  return (
    <div>
      <div className="w-full h-15rem bg-[#f0ede9] m-auto p-4">
        <h1 className="text-black-500 text-center py-[2rem] font-[600] text-[2rem]">
          Todo app
        </h1>
        <div className="flex flex-col w-[30%] m-auto mb-4">
          <input
            className="px-[1rem] py-[0.4rem] "
            type="text"
            placeholder="Title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <input
            className=" my-[1rem] px-[1rem] py-[0.4rem]"
            type="text"
            placeholder="Description"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
          />
          <button
            className="bg-[#13b987] w-[80%] m-auto hover:bg-[#000] transition-colors duration-200 font-[600] py-[0.5rem] px-[2rem] rounded text-white"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
      <div className="w-[90%] m-auto grid grid-cols-3 gap-[2rem]">
        {todoStore.todos.map((todo: Todo) => (
          <div
            key={todo.id}
            className="h-auto py-[1rem] px-[0.5rem] text-center border-t-3.2px border-black shadow-md"
          >
            <h3 className="mb-2 font-bold">{todo.title}</h3>
            <p className="mb-2">{todo.description}</p>
            <p className="mb-2">Status: {todo.status}</p>
            {toggleInput ? (
              <div>
                <input
                  className="px-[1rem] py-[0.4rem] "
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={handleInputChange}
                />

                <input
                  className="my-[1rem] px-[1rem] py-[0.4rem]"
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={handleInputChange}
                />
                <button
                  className="text-black border-[1px] border-[#000] mx-[0.2rem] hover:bg-black hover:text-white py-2 px-4 rounded transition-colors duration-300"
                  onClick={() => handleSubmitUpdate(todo.id)}
                >
                  Update
                </button>
              </div>
            ) : null}
            <button
              className="text-black border-[1px] border-[#000] mx-[0.2rem] hover:bg-black hover:text-white py-2 px-4 rounded transition-colors duration-300"
              onClick={() => handleToggleTodo(todo.id)}
            >
              Toggle
            </button>
            <button
              className="text-black border-[1px] border-[#000] mx-[0.2rem] hover:bg-black hover:text-white py-2 px-4 rounded transition-colors duration-300"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
            <button
              className="text-black border-[1px] border-[#000] mx-[0.2rem] hover:bg-black hover:text-white py-2 px-4 rounded transition-colors duration-300"
              onClick={handleToggleState}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(TodoPage);
