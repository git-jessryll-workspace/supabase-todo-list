import TodoItem from "./TodoItem";
import TodoImage from "./../../assets/to-do-list.png";

export default function TodoList({ todoList, setTodoList }) {
  return (
    <div className="space-y-1">
      {todoList.length ===
        todoList.filter((todo) => todo.is_deleted).length && (
        <div className="flex justify-center items-center py-4">
          <div>
            <div className="flex justify-center">
              <img src={TodoImage} className="h-10 w-10" />
            </div>
            <h1 className="text-gray-400 font-semibold antialiased">
              Add your first Todo
            </h1>
          </div>
        </div>
      )}
      {todoList.map((todo) => (
        <TodoItem key={todo.ref_id} todo={todo} setTodoList={setTodoList} />
      ))}
    </div>
  );
}
