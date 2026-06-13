import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Section } from '@/components/section';
import { categories, products, testimonials } from '@/lib/data';

export default function HomePage() {
  const featured = products.filter((p) => p.featured);
  const bestsellers = products.filter((p) => p.bestseller);

  return (
    <div className="py-8">
      <section className="rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-700 px-6 py-16 text-white">
        <p className="mb-3 text-sm uppercase tracking-widest">NovaMart</p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Shop smarter with a modern global storefront</h1>
        <p className="mb-6 max-w-2xl text-white/85">Discover curated products, secure Stripe checkout, and seamless order tracking.</p>
        <Link href="/products" className="rounded bg-white px-4 py-2 font-semibold text-black">Shop now</Link>
      </section>

      <Section title="Featured Products">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section title="Categories">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`} className="rounded-xl border p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm opacity-75">Explore {category.name} essentials</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Best Sellers">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      <Section title="Testimonials">
        <div className="grid gap-3 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className="rounded-xl border p-4">
              <p>“{item.text}”</p>
              <p className="mt-2 text-sm font-semibold">— {item.name}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Newsletter">
        <form className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row">
          <input type="email" placeholder="Enter your email" className="flex-1 rounded border px-3 py-2" />
          <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Subscribe</button>
        </form>
      </Section>
    </div>
  );
}
