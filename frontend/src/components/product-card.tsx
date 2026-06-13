'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useStore } from '@/context/store';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, addToWishlist, wishlist, convertPrice, currency } = useStore();

  return (
    <article className="overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/20 dark:bg-zinc-900">
      <div className="relative h-52 w-full">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="space-y-3 p-4">
        <Link href={`/products/${product.slug}`} className="font-semibold hover:underline">
          {product.name}
        </Link>
        <p className="text-sm opacity-80">{product.description}</p>
        <p className="font-bold">
          {currency} {convertPrice(product.price).toFixed(2)}
        </p>
        <div className="flex gap-2">
          <button onClick={() => addToCart(product.id)} className="rounded bg-black px-3 py-1.5 text-white dark:bg-white dark:text-black">
            Add to Cart
          </button>
          <button onClick={() => addToWishlist(product.id)} className="rounded border px-3 py-1.5">
            {wishlist.includes(product.id) ? 'Wishlisted' : 'Wishlist'}
          </button>
        </div>
      </div>
    </article>
  );
}
