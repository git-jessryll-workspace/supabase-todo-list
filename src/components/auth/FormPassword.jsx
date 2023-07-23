export default function FormPassword({ inputPasswordRef }) {
  return (
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
  );
}
