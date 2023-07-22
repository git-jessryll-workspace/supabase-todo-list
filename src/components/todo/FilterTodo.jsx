export default function FilterTodo({ filterBy, setFilterBy, text = "ALL" }) {
  return (
    <button
      onClick={() => {
        setFilterBy(text);
      }}
      className={`${filterBy === text && "border-b border-gray-300"}`}
    >
      {text}
    </button>
  );
}
