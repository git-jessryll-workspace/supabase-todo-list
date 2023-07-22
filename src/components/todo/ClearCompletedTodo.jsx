import api from "../../api";

export default function ClearTodoCompleted({ setTodoList }) {
  const handleClearCompleted = async () => {
    setTodoList((todoList) => todoList.filter((todo) => !todo.is_done));
    api.Todo.deleteCompleted();
  };
  return <button onClick={handleClearCompleted}>Clear Completed</button>;
}
