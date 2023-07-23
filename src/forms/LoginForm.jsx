import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setErrorMessage("");
      setLoading(true);

      if (!inputPasswordRef.current?.value || !inputEmailRef.current?.value) {
        setErrorMessage("Please fill in the fields");
        return;
      }

      const {
        data: { user, session },
        error,
      } = await login(
        inputEmailRef.current.value,
        inputPasswordRef.current.value
      );
      if (error) setErrorMessage(error.message);
      if (user && session) navigate("/");
    } catch (error) {
      setErrorMessage("Email or Password Incorrect");
    }

    setLoading(false);
  };
  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="font-semibold text-gray-700">
            Email
          </label>
          <div>
            <input
              id="email"
              ref={inputEmailRef}
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="font-semibold text-gray-700">
            Password
          </label>
          <div>
            <input
              id="password"
              ref={inputPasswordRef}
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="flex text-sm items-center">
          <a className="text-blue-700 font-semibold">Forgot Password</a>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg bg-green-700 text-white p-2.5 ${
              loading && "opacity-50"
            }`}
          >
            Sign in
          </button>
        </div>
      </form>
      {errorMessage !== "" && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-red-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Whoops</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc space-y-1 pl-5">
                  <li>{errorMessage}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
