import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoute } from "./components";
import TodoProvider from "./context/TodoProvider";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const TodoPage = lazy(() => import("./pages/TodoPage"));

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
            <div className="mt-10">
              <main className="flex justify-center">
                <Suspense fallback={<div>loading...</div>}>
                  <TodoProvider>
                    <TodoPage />
                  </TodoProvider>
                </Suspense>
              </main>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
