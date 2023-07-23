export default function FormEmail({ inputEmailRef }) {
  return (
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
  );
}
