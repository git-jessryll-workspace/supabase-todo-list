import { useState } from "react";
import LoginForm from "../forms/LoginForm";

export default function AuthPage() {
  const [authFormType, setAuthFormType] = useState("LOGIN");
  return (
    <div className="flex justify-center pt-20">
      <div className="w-full md:w-1/2 lg:w-1/4 h-[500px] border border-gray-300 rounded-lg shadow-md p-6">
        {authFormType === "LOGIN" && <LoginForm />}
        <div className="py-6 space-y-3">
          <div className="flex justify-between items-center">
            <div className="w-[43%] border-t-2 border-gray-300"></div>
            <div className="w-[6%] text-center text-sm font-semibold text-gray-400">Or</div>
            <div className="w-[43%] border-t-2 border-gray-300"></div>
          </div>
          <div className="text-sm text-center">
            <p>
              If you don't have an account, you can{" "}
              <a className="font-semibold text-blue-700">Create account here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
