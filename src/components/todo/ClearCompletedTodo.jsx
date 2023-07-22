import api from "../../api";
import { decodeJwt } from "../../utils";

export default function ClearTodoCompleted({ setTodoList }) {
  const { sub } = decodeJwt();
  const handleClearCompleted = async () => {
    setTodoList((todoList) => todoList.filter((todo) => !todo.is_done));
    api.Todo.deleteCompleted(sub);
  };
  return <button onClick={handleClearCompleted}>Clear Completed</button>;
}
