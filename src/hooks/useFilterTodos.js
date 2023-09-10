import { useMemo, useState } from "react";

const useFilterTodos = ({ todoList }) => {
  const TYPE_ALL = "ALL";
  const TYPE_ACTIVE = "ACTIVE";
  const TYPE_COMPLETED = "COMPLETED";

  const [filter, setFilter] = useState(TYPE_ALL);

  const filterList = () => {
    let list = [];
    switch (filter) {
      case TYPE_ACTIVE:
        list = todoList.filter((todo) => !todo.is_done);
        break;
      case TYPE_COMPLETED:
        list = todoList.filter((todo) => todo.is_done);
        break;
      default:
        list = todoList;
        break;
    }
    return list;
  };

  const filterTodoList = useMemo(() => filterList(), [filter, todoList]);

  return {
    filterTodoList,
    TYPE_ALL,
    setFilter,
    filter
  };
};

export default useFilterTodos;
