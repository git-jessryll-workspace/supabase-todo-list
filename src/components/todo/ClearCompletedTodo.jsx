import { useAuth } from "../../context/AuthProvider";

export default function ClearTodoCompleted({ setTodoList }) {
  const { user } = useAuth();
  const handleClearCompleted = async () => {
    setTodoList((todoList) => todoList.filter((todo) => !todo.is_done));
    
    const {deleteCompleted} = await import('./../../api/todo').then(module => {
      return module.default
    })
    await deleteCompleted(user.id);
  };

  return <button onClick={handleClearCompleted}>Clear Completed</button>;
}
