import { memo } from "react";
import TodoImage from "../../assets/to-do-list.png";
import { useTodo } from "../../context/TodoProvider";

function TodoEmptyMessageComponent({todos}) {
  
  return (
    <>
      {todos.length === todos.filter((todo) => todo.is_deleted).length && (
        <div className="flex justify-center items-center py-20">
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
    </>
  );
}

const TodoEmptyMessage = memo(TodoEmptyMessageComponent);

export default TodoEmptyMessage;
