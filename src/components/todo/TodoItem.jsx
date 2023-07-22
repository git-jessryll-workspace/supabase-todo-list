import { useEffect, useState } from "react";
import TodoDelete from "./TodoDelete";
import TodoToggleDone from "./TodoToggleDone";
import { AnimatePresence, motion } from "framer-motion";

export default function TodoItem({ todo, setTodoList }) {
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => setTodoList((todoList) =>
        todoList.map((todoItem) => {
          if (todo.ref_id === todoItem.ref_id) {
            return {
              ...todoItem,
              is_deleted: true,
            };
          }
          return todoItem;
        })
      ), 500)
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
          className={`border border-gray-300 rounded-lg p-3 flex justify-between items-center hover:bg-gray-200`}
        >
          <TodoToggleDone todo={todo} />
          <TodoDelete todo={todo} setIsDeleted={setIsDeleted} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
