import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";

export default function AuthPage() {
  const [authFormType, setAuthFormType] = useState("LOGIN");
  return (
    <div className="flex justify-center pt-20">
      <div className="w-full md:w-1/2 lg:w-[30%] h-[600px] border border-gray-300 rounded-lg shadow-md p-6">
        {authFormType === "LOGIN" && <LoginForm />}
        {authFormType === "REGISTER" && <RegisterForm />}
        <div className="py-6 space-y-3">
          <div className="flex justify-between items-center">
            <div className="w-[43%] border-t-2 border-gray-300"></div>
            <div className="w-[6%] text-center text-sm font-semibold text-gray-400">
              Or
            </div>
            <div className="w-[43%] border-t-2 border-gray-300"></div>
          </div>
          <div className="text-sm text-center">
            {authFormType === "LOGIN" ? (
              <p>
                If you don't have an account, you can{" "}
                <span
                  className="font-semibold text-blue-700 cursor-pointer"
                  onClick={() => {
                    setAuthFormType("REGISTER");
                  }}
                >
                  create account here
                </span>
              </p>
            ) : (
              <p>
                Have already account?{" "}
                <a href="#" className="font-semibold text-blue-700">
                  Sign in
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
