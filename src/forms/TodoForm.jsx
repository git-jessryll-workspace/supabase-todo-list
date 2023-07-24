import { useRef } from "react";
import { useAuth } from "../context/AuthProvider";

export default function ({ setTodoList }) {
  const { user } = useAuth();
  const todoInputRef = useRef();

  const handleAddTodo = async (event) => {
    event.preventDefault();

    const title = todoInputRef.current.value;

    if (title === "") return;

    let refId;
    await import("uuid")
      .then((module) => {
        return module.v4();
      })
      .then((uuid) => (refId = uuid));

    const data = {
      ref_id: refId,
      title,
      user_id: user.id,
    };

    setTodoList((todoList) => {
      return [data, ...todoList];
    });

    todoInputRef.current.value = "";

    const { createTodo } = await import("./../api/todo").then((module) => {
      return module.default;
    });
    await createTodo(data);
  };

  return (
    <>
      <form onSubmit={handleAddTodo} className="text-gray-500 pb-4">
        <div>
          <input
            ref={todoInputRef}
            className="w-full border border-gray-300 text-lg p-2.5 rounded-lg text-gray-700 font-bold"
            name="title"
            placeholder="What needs to be done?"
          />
        </div>
      </form>
    </>
  );
}
