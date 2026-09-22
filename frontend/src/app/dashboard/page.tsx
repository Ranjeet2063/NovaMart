export default function DashboardPage() {
  return (
    <div className="space-y-4 py-10">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <div className="grid gap-3 md:grid-cols-3">
        <article className="rounded border p-4"><h2 className="font-semibold">Profile</h2><p>Manage account settings.</p></article>
        <article className="rounded border p-4"><h2 className="font-semibold">Recent Orders</h2><p>Track latest purchases.</p></article>
        <article className="rounded border p-4"><h2 className="font-semibold">Saved Addresses</h2><p>Faster checkout support.</p></article>
      </div>
    </div>
  );
}
