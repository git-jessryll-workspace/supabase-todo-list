import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../api";

export default function ({ setTodoList }) {
  const todoInputRef = useRef();

  const handleAddTodo = async (event) => {
    event.preventDefault();
    const refId = uuidv4();
    const title = todoInputRef.current.value;
    setTodoList((todoList) => {
      return [
        {
          ref_id: refId,
          title,
        },
        ...todoList,
      ];
    });
    todoInputRef.current.value = "";

    await api.Todo.createTodo({
      ref_id: refId,
      title,
    });
  };
  return (
    <>
      <form onSubmit={handleAddTodo} className="text-gray-500 pb-4">
        <div>
          <input
            ref={todoInputRef}
            className="w-full border border-gray-300 text-xl p-4 rounded-lg text-gray-700 font-bold"
            name="title"
            placeholder="What needs to be done?"
          />
        </div>
      </form>
    </>
  );
}
