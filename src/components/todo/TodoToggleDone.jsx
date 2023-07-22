import { useEffect, useState } from "react";
import api from "../../api";

export default function TodoToggleDone({ todo }) {
  const [isDone, setIsDone] = useState();

  useEffect(() => {
    setIsDone(todo.is_done);
  }, [todo]);

  const handleToggleDone = async () => {
    setIsDone(true);
    await api.Todo.updateTodo(todo.ref_id, { is_done: !todo.is_done });
  };

  return (
    <div
      className={`flex items-center cursor-pointer ${
        isDone && "line-through italic"
      }`}
      onClick={handleToggleDone}
    >
      {todo.title}
    </div>
  );
}
