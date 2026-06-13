'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { ProductCard } from '@/components/product-card';
import { useStore } from '@/context/store';
import { products } from '@/lib/data';

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { addToCart, convertPrice, currency } = useStore();
  const { slug } = use(params);
  const product = products.find((item) => item.slug === slug);

  if (!product) return notFound();

  const related = products.filter((item) => item.category === product.category && item.id !== product.id);

  return (
    <div className="space-y-8 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-xl">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p>{product.description}</p>
          <p className="text-2xl font-bold">
            {currency} {convertPrice(product.price).toFixed(2)}
          </p>
          <p>Rating: {product.rating} / 5</p>
          <p>Inventory: {product.inventory}</p>
          <div className="flex gap-3">
            <button onClick={() => addToCart(product.id)} className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Add to Cart</button>
            <button onClick={() => addToCart(product.id)} className="rounded border px-4 py-2">Buy Now</button>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
        {product.reviews.map((review) => (
          <article key={review.id} className="rounded border p-3">
            <p className="font-semibold">{review.user} — {review.rating}/5</p>
            <p>{review.comment}</p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
