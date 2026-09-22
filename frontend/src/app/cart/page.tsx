'use client';

import Link from 'next/link';
import { useStore } from '@/context/store';
import { products } from '@/lib/data';

export default function CartPage() {
  const { cart, convertPrice, currency } = useStore();
  const rows = cart
    .map((item) => ({ product: products.find((p) => p.id === item.productId), quantity: item.quantity }))
    .filter((row): row is { product: (typeof products)[number]; quantity: number } => Boolean(row.product));

  const total = rows.reduce((sum, row) => sum + row.product.price * row.quantity, 0);

  return (
    <div className="space-y-6 py-10">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      {rows.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <article key={row.product.id} className="flex items-center justify-between rounded border p-3">
              <p>{row.product.name}</p>
              <p>Qty: {row.quantity}</p>
              <p>{currency} {convertPrice(row.product.price * row.quantity).toFixed(2)}</p>
            </article>
          ))}
          <p className="text-lg font-bold">Total: {currency} {convertPrice(total).toFixed(2)}</p>
          <Link href="/checkout" className="inline-block rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
}
