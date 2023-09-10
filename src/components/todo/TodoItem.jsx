import { memo, useLayoutEffect, useState } from "react";
import TodoDelete from "./TodoDelete";
import TodoToggleDone from "./TodoToggleDone";
import { AnimatePresence, motion } from "framer-motion";
import { useTodo } from "../../context/TodoProvider";

function TodoItemComponent({ todo }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { updatedDeleteTodoList } = useTodo();
  useLayoutEffect(() => {
    if (isDeleted) {
      setTimeout(() => updatedDeleteTodoList({ todoRefId: todo.ref_id }), 500);
    }
  }, [isDeleted]);
  return (
    <AnimatePresence>
      {!isDeleted && (
        <motion.div
          transition={{ delay: 0.1 }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          key={todo.id}
          className={`border border-gray-300 rounded-lg p-3 flex justify-between items-center hover:bg-gray-200 my-1`}
        >
          <TodoToggleDone todo={todo} />
          <TodoDelete todo={todo} setIsDeleted={setIsDeleted} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const TodoItem = memo(TodoItemComponent);

export default TodoItem;
