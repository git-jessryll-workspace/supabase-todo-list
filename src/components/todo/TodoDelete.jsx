import { useTodo } from "../../context/TodoProvider";

export default function TodoDelete({ todo, setIsDeleted }) {
  const { deleteTodo } = useTodo();
  const handleDeleteTodo = async () => {
    setIsDeleted(true);
    await deleteTodo({ todoRefId: todo.ref_id });
  };
  return (
    <div>
      <svg
        onClick={handleDeleteTodo}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
