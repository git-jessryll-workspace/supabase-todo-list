import { useTodo } from "../../context/TodoProvider";
import FilterTodo from "./FilterTodo";

export default function TodoFooter({ todoList }) {
  const { setFilterBy, filterBy } = useTodo();
  return (
    <div className="flex text-sm justify-between items-center h-[50px] px-2">
      <div>
        {
          todoList
            .filter((todo) => !todo.is_deleted)
            .filter((todo) => !todo.is_done).length
        }{" "}
        items left
      </div>
      <div className="flex items-center space-x-3">
        <FilterTodo
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          text={"ALL"}
        />
        <FilterTodo
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          text={"ACTIVE"}
        />
        <FilterTodo
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          text={"COMPLETED"}
        />
      </div>
    </div>
  );
}
