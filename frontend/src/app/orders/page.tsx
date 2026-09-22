export default function OrdersPage() {
  return (
    <div className="space-y-4 py-10">
      <h1 className="text-3xl font-bold">Order Tracking</h1>
      <div className="rounded border p-4">
        <p><strong>Order #INV-172924</strong> — Shipped</p>
        <p className="text-sm opacity-80">Expected delivery: 2 business days.</p>
      </div>
      <div className="rounded border p-4">
        <p><strong>Invoice generation:</strong> each order in backend stores unique <code>invoiceNumber</code>.</p>
      </div>
    </div>
  );
}
