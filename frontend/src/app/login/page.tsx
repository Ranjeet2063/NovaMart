export default function LoginPage() {
  return (
    <div className="space-y-4 py-10">
      <h1 className="text-3xl font-bold">User Login</h1>
      <form className="grid max-w-md gap-3 rounded border p-4">
        <input type="email" placeholder="Email" className="rounded border px-3 py-2" />
        <input type="password" placeholder="Password" className="rounded border px-3 py-2" />
        <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Login</button>
      </form>
    </div>
  );
}
