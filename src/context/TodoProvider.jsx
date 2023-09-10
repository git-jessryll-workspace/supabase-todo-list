import { createContext, useContext, useEffect, useRef, useState } from "react";
import useSupabase from "../hooks/useSupabase";
import useFilterTodos from "../hooks/useFilterTodos";

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const dataFetchRef = useRef(false);

  const [todos, setTodos] = useState([]);

  const { supabaseTodoChange } = useSupabase();
  const { filterTodoList, setFilter, filter } = useFilterTodos({ todoList: todos });

  useEffect(() => {
    if (dataFetchRef.current) return;

    dataFetchRef.current = true;
    todoApi().then(async ({ getTodos }) => {
      const { data } = await getTodos();
      setTodos((todos) => [...todos, ...data]);
    });

    supabaseTodoChange((payload) => {
      if (payload.eventType === "UPDATE") {
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo.ref_id === payload.new.ref_id) {
              return {
                ...todo,
                is_done: payload.new.is_done,
              };
            }
            return todo;
          })
        );
      }
    });
  }, []);

  const todoApi = async () => {
    return await import("../api/todo").then((module) => module.default);
  };

  const addTodo = async ({ todoText, user_id }) => {
    let refId;
    await import("../utils").then(
      async (module) =>
        await module.generateUuid().then((uuid) => {
          refId = uuid;
        })
    );
    const data = {
      ref_id: refId,
      title: todoText,
      user_id,
    };
    setTodos((todos) => [data, ...todos]);
    const { createTodo } = await todoApi();
    await createTodo(data);
  };

  const deleteTodo = async ({ todoRefId }) => {
    const { deleteTodo } = await todoApi();
    await deleteTodo(todoRefId);
  };

  const updatedDeleteTodoList = ({ todoRefId }) => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todoRefId === todo.ref_id) {
          return {
            ...todo,
            is_deleted: true,
          };
        }
        return todo;
      });
    });
  };

  const deleteAllTodos = async ({ userId }) => {
    setTodos([]);
    const { deleteTodoByUserId } = await todoApi();
    await deleteTodoByUserId(userId);
  };

  const deleteAllCompleted = async ({ userId }) => {
    setTodos((todos) => todos.filter((todo) => !todo.is_done));
    const { deleteCompleted } = await todoApi();
    await deleteCompleted(userId);
  };

  return (
    <TodoContext.Provider
      value={{
        todos: filterTodoList,
        setTodos,
        addTodo,
        deleteTodo,
        updatedDeleteTodoList,
        deleteAllTodos,
        deleteAllCompleted,
        setFilterBy: setFilter,
        filterBy: filter
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
