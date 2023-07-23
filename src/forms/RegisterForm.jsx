import { lazy, useRef, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import FormEmail from "../components/auth/FormEmail";
import FormPassword from "../components/auth/FormPassword";
import FormConfirmPassword from "../components/auth/FormConfirmPassword";

const AlertAuthMessageComponent = lazy(() =>
  import("./../components/auth/AlertAuthMessage")
);

export default function RegisterForm() {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setErrorMessage("");
      setMessage("");
      if (
        !inputEmailRef.current?.value ||
        !inputPasswordRef.current?.value ||
        !inputConfirmPasswordRef.current?.value
      ) {
        setErrorMessage("Please fill in the fields");
        return;
      }

      if (
        inputConfirmPasswordRef.current.value !== inputPasswordRef.current.value
      ) {
        setErrorMessage("Passwords doesn't match");
        return;
      }
      const { data, error } = await register(
        inputEmailRef.current.value,
        inputPasswordRef.current.value
      );
      if (!error && data) {
        setMessage(
          "Registration Successful. Check your email to confirm your account"
        );
      }
    } catch (error) {
      setErrorMessage("Error in creating account");
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormEmail inputEmailRef={inputEmailRef} />
        <FormPassword inputPasswordRef={inputPasswordRef} />
        <FormConfirmPassword
          inputConfirmPasswordRef={inputConfirmPasswordRef}
        />
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg bg-green-700 text-white p-2.5 ${
              loading && "opacity-50"
            }`}
          >
            Register
          </button>
        </div>
      </form>
      {message !== "" && (
        <div className="rounded-md bg-blue-50 p-4 mt-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                {message}
              </p>
              
            </div>
          </div>
        </div>
      )}
      {errorMessage !== "" && (
        <AlertAuthMessageComponent errorMessage={errorMessage} />
      )}
    </>
  );
}
