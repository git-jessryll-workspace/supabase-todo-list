import { supabase } from "../supabaseClient";

const TABLE = "todos";

const PRIMARY = "ref_id";

export default {
  getTodos: async () => {
    return await supabase
      .from(TABLE)
      .select()
      .order("id", { ascending: false });
  },
  createTodo: async (formData) => {
    return await supabase.from(TABLE).insert(formData);
  },
  updateTodo: async (refId, formData) => {
    return await supabase.from(TABLE).update(formData).eq(PRIMARY, refId);
  },
  deleteTodo: async (refId) => {
    return await supabase.from(TABLE).delete().eq(PRIMARY, refId);
  },
  deleteCompleted: async (userId) => {
    return await supabase.from(TABLE).delete().eq("is_done", true).eq('user_id', userId);
  },
  deleteTodoByUserId: async (userId) => {
    return await supabase.from(TABLE).delete().eq('user_id', userId)
  }
};
