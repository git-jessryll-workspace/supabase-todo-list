export default function FormConfirmPassword({ inputConfirmPasswordRef }) {
    return (
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="font-semibold text-gray-700">
          Confirm Password
        </label>
        <div>
          <input
            id="confirm-password"
            ref={inputConfirmPasswordRef}
            type="password"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    );
  }
  