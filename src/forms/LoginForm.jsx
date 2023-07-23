import { Suspense, lazy, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import FormEmail from "../components/auth/FormEmail";
import FormPassword from "../components/auth/FormPassword";
import ForgotPasswordLink from "../components/auth/ForgotPasswordLink";

const AlertAuthMessageComponent = lazy(() =>
  import("./../components/auth/AlertAuthMessage")
);

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
        <FormEmail inputEmailRef={inputEmailRef} />
        <FormPassword inputPasswordRef={inputPasswordRef} />
        <ForgotPasswordLink />
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
        <Suspense fallback={<>Loading...</>}>
          <AlertAuthMessageComponent errorMessage={errorMessage} />
        </Suspense>
      )}
    </>
  );
}
