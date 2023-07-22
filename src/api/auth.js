import { supabase } from "../supabaseClient";


export default {
    getSession: async () => {
        return await supabase.auth.getSession()
    }
}