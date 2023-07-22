import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "./supabaseClient";
import TodoPage from "./pages/TodoPage";
import api from "./api";
import Header from "./components/Header";

function App() {
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    api.Auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (session) {
      window.localStorage.setItem('access_token', session.access_token);
    }

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full md:w-1/4 border border-gray-300 rounded-lg shadow-md p-6">
          <Auth
            supabaseClient={supabase}
            appearance={{
              extend: true,
              theme: ThemeSupa,
              className: {
                button: "text-gray-300",
              },
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <Header />
      <main className="flex justify-center">
        <TodoPage />
      </main>
    </div>
  );
}

export default App;
