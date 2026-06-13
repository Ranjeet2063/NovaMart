const cards = [
  'Product management',
  'Category management',
  'Order management',
  'Customer management',
  'Review management',
  'Sales analytics'
];

export default function AdminPage() {
  return (
    <div className="space-y-4 py-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((title) => (
          <article key={title} className="rounded border p-4">
            <h2 className="font-semibold">{title}</h2>
            <p className="text-sm opacity-80">Manage {title.toLowerCase()} from secure APIs.</p>
          </article>
        ))}
      </div>
    </div>
  );
}
