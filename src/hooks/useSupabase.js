import { supabase } from "../supabaseClient";

const useSupabase = () => {
  const supabaseTodoChange = (callback) => {
    return supabase
      .channel("table-todos-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          callback(payload)
        }
      )
      .subscribe();
  };

  return {supabaseTodoChange}
};

export default useSupabase;
