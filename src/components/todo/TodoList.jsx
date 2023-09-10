import { memo } from "react";
import TodoItem from "./TodoItem";
const TodoListComponent = ({ todoList }) => {
  return todoList.map((todo) => <TodoItem key={todo.ref_id} todo={todo} />);
};
const TodoList = memo(TodoListComponent);

export default TodoList;
