import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import TodoForm from "../forms/TodoForm";
import TodoList from "../components/todo/TodoList";
import TodoFooter from "../components/todo/TodoFooter";
import TodoSetting from "../components/todo/TodoSetting";
import Logo from "./../assets/logo-todo.png";

export default function TodoPage() {
  const [filterBy, setFilterBy] = useState("ALL");
  const [todoList, setTodoList] = useState([]);
  const dataFetchRef = useRef(false);

  useEffect(() => {
    if (dataFetchRef.current) return;

    dataFetchRef.current = true;

    const todoApi = async () =>
      await import("../api/todo").then((module) => {
        return module.default;
      });

    todoApi().then(async ({ getTodos }) => {
      const { data } = await getTodos();
      setTodoList(data);
    });

    supabase
      .channel("table-todos-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            setTodoList((todoList) =>
              todoList.map((todo) => {
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
        }
      )
      .subscribe();
  }, []);

  const filterTodoList = () => {
    let list = [];
    switch (filterBy) {
      case "ACTIVE":
        list = todoList.filter((todo) => !todo.is_done);
        break;
      case "COMPLETED":
        list = todoList.filter((todo) => todo.is_done);
        break;
      default:
        list = todoList;
        break;
    }
    return list;
  };

  return (
    <div className="md:border md:border-gray-300 p-4 relative md:rounded-xl md:shadow-md w-full md:w-[60%] lg:w-[50%] xl:w-[40%]">
      <div className="flex justify-between items-center px-2 py-4">
        <div>
          <a href="#" className="-m-1.5 p-1.5 flex space-x-2 items-center">
            <img className="h-8 w-auto" src={Logo} alt="" />
            <h5 className="font-semibold text-lg">Todo List</h5>
          </a>
        </div>
        <TodoSetting setTodoList={setTodoList} />
      </div>
      <div>
        <TodoForm setTodoList={setTodoList} />
        <TodoList todoList={filterTodoList()} setTodoList={setTodoList} />
      </div>
      <TodoFooter
        todoList={todoList}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        setTodoList={setTodoList}
      />
    </div>
  );
}
