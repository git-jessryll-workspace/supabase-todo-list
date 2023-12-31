import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const userFetchRef = useRef();

  const navigate = useNavigate();

  const getUser = async () => {
    if (userFetchRef.current) return;
    userFetchRef.current = true;
    const { data } = await supabase.auth.getUser();
    const { user: currentUser } = data;
    setUser(currentUser ?? null);
    setAuth(currentUser ? true : false);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
        navigate("/");
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
        navigate("/login");
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
