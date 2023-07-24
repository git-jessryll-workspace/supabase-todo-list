import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from "../supabaseClient";

export default function AuthPage() {
  return (
    <div className="flex justify-center pt-20">
      <div className="w-full md:w-1/2 lg:w-[30%] h-full border border-gray-300 rounded-lg shadow-md p-6">
        <Auth
          supabaseClient={supabase}
          appearance={{theme: ThemeSupa}}
          providers={[]}
        />
      </div>
    </div>
  );
}
