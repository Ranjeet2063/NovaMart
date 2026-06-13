export default function CheckoutPage() {
  return (
    <div className="space-y-4 py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p>Stripe-ready checkout endpoint: <code>/api/orders/checkout</code>.</p>
      <form className="grid gap-3 rounded border p-4 md:grid-cols-2">
        <input placeholder="Full Name" className="rounded border px-3 py-2" />
        <input placeholder="Email" className="rounded border px-3 py-2" />
        <input placeholder="Address" className="rounded border px-3 py-2 md:col-span-2" />
        <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black md:col-span-2">Pay Securely</button>
      </form>
    </div>
  );
}
