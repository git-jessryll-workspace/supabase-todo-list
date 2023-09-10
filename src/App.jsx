import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoute } from "./components";
import TodoProvider from "./context/TodoProvider";
import { ClockLoader } from "react-spinners";

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
                <Suspense
                  fallback={
                    <div className="flex justify-center h-[300px] items-center">
                      <ClockLoader color="#36d7b7"/>
                    </div>
                  }
                >
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
