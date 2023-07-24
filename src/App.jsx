import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const TodoPage = lazy(() => import("./pages/TodoPage"));

const HeaderComponent = lazy(() => import("./components/Header"));

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense>
            <AuthPage />
          </Suspense>
        }
      />
      <Route element={<AuthRoute />}>
        <Route
          path="/"
          element={
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <HeaderComponent />
              </Suspense>
              <main className="flex justify-center">
                <Suspense fallback={<div>loading...</div>}>
                  <TodoPage />
                </Suspense>
              </main>
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
