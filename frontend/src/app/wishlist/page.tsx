'use client';

import { ProductCard } from '@/components/product-card';
import { useStore } from '@/context/store';
import { products } from '@/lib/data';

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="space-y-6 py-10">
      <h1 className="text-3xl font-bold">Wishlist</h1>
      {items.length === 0 ? (
        <p>No items in wishlist yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
