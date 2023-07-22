import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import TodoForm from "../forms/TodoForm";
import TodoList from "../components/todo/TodoList";
import TodoFooter from "../components/todo/TodoFooter";
import api from "../api";
import TodoSetting from "../components/todo/TodoSetting";

export default function TodoPage() {
  const [filterBy, setFilterBy] = useState("ALL");
  const [todoList, setTodoList] = useState([]);
  const dataFetchRef = useRef(false);

  useEffect(() => {
    if (dataFetchRef.current) return;

    dataFetchRef.current = true;

    api.Todo.getTodos().then((res) => setTodoList(res.data));

    let channel = supabase
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
    return () => {
      supabase.removeChannel(channel);
    };
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
    <div className="md:border md:border-gray-300 p-4 md:rounded-xl shadow-md w-full md:w-[50%]">
      <div className="flex justify-end items-center">
        <TodoSetting setTodoList={setTodoList} />
      </div>
      <div className="flex justify-center py-5">
        <h1 className="text-3xl font-bold antialiased text-gray-500">
          Todo List
        </h1>
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
