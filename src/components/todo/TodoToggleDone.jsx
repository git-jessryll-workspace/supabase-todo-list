import { useEffect, useState } from "react";
import { useTodo } from "../../context/TodoProvider";

export default function TodoToggleDone({ todo }) {
  const [isDone, setIsDone] = useState();

  const { toggleStatus } = useTodo();

  useEffect(() => {
    setIsDone(todo.is_done);
  }, [todo.is_done]);


  const handleToggleDone = async () => {
    setIsDone(!isDone);
    await toggleStatus({ todoRefId: todo.ref_id, is_done: !isDone });
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
