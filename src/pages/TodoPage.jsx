import { useState } from "react";
import Logo from "./../assets/logo-todo.png";
import {
  TodoFooter,
  TodoList,
  TodoSetting,
  TodoEmptyMessage,
} from "../components/todo";
import { TodoForm } from "../forms";
import { useTodo } from "../context/TodoProvider";

export default function TodoPage() {
  const [filterBy, setFilterBy] = useState("ALL");

  const {todos} = useTodo();
  
  return (
    <div className="md:border md:border-gray-300 p-4 relative md:rounded-xl md:shadow-md w-full md:w-[60%] lg:w-[50%] xl:w-[40%]">
      <div className="flex justify-between items-center px-2 py-4">
        <div>
          <a href="#" className="-m-1.5 p-1.5 flex space-x-2 items-center">
            <img className="h-8 w-auto" src={Logo} alt="" />
            <h5 className="font-semibold text-lg">Todo List</h5>
          </a>
        </div>
        <TodoSetting />
      </div>
      <div>
        <TodoForm />
        <TodoEmptyMessage todos={todos}/>
        <TodoList todoList={todos}/>
      </div>
      <TodoFooter
        todoList={todos}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
    </div>
  );
}
