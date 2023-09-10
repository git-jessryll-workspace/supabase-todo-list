import { useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { useTodo } from "../context/TodoProvider";

export default function () {
  const { user } = useAuth();
  const todoInputRef = useRef();

  const { addTodo } = useTodo();

  const handleAddTodo = async (event) => {
    event.preventDefault();

    const title = todoInputRef.current.value;

    if (title === "") return;

    todoInputRef.current.value = "";
    await addTodo({ todoText: title, user_id: user.id });
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
