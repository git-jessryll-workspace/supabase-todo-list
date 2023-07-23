import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";


const getURL = () => {
  let url =
    process?.env?.VITE_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.VITE_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:5173/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const register = (email, password) => supabase.auth.signUp({ email, password, options: {
  redirectTo: "http://localhost:5173/virify-user"
} });

const passwordReset = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password",
  });

const updatePassword = (updatedPassword) =>
  supabase.auth.updateUser({ password: updatedPassword });

const signOut = () => supabase.auth.signOut();

const setAuth = (accessToken) => supabase.auth.setAuth(accessToken);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const userFetchRef = useRef();

  const getUser = async () => {
    if (userFetchRef.current) return;
    userFetchRef.current = true;
    const { data } = await supabase.auth.getUser();
    const { user: currentUser } = data;
    setUser(currentUser ?? null);
    setAuth(currentUser ? true : false);
    setLoading(false);
  };

  const getCurrentUrl = () => {
    return window.location.href;
  }

  useEffect(() => {
    
    const fullURL = getCurrentUrl();

    if (fullURL.includes('#access_token'))

    console.log(fullURL.split('#'))

    setLoading(true);

    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
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
        login,
        signOut,
        register,
        passwordReset,
        updatePassword,
        setAuth,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
