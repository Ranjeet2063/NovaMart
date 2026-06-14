'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import { apiFetch } from '@/lib/utils';

const heroSlides = [
  { title: 'Summer Sale', subtitle: 'Up to 50% off on electronics', bg: 'from-primary-600 to-primary-800', cta: 'Shop Now', link: '/products?category=electronics' },
  { title: 'New Collection', subtitle: 'Premium fashion for every season', bg: 'from-accent-600 to-accent-800', cta: 'Explore', link: '/products?category=clothing' },
  { title: 'Smart Home Deals', subtitle: 'Transform your home with AI', bg: 'from-gray-800 to-gray-900', cta: 'Discover', link: '/products?category=home-kitchen' }
];

const features = [
  { icon: FiTruck, title: 'Free Shipping', desc: 'On orders over $100' },
  { icon: FiShield, title: 'Secure Payment', desc: '100% secure checkout' },
  { icon: FiRefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: FiHeadphones, title: '24/7 Support', desc: 'Dedicated support team' }
];

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    apiFetch('/products?limit=8&sort=-createdAt').then(d => setProducts(d.products)).catch(() => {});
    apiFetch('/products?featured=true&limit=4').then(d => setFeatured(d.products)).catch(() => {});
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in">
      <section className={`relative overflow-hidden bg-gradient-to-r ${heroSlides[heroIndex].bg} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-white/80 mb-2">Welcome to NovaMart</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroSlides[heroIndex].title}</h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">{heroSlides[heroIndex].subtitle}</p>
            <Link href={heroSlides[heroIndex].link} className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              {heroSlides[heroIndex].cta} <FiArrowRight />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === heroIndex ? 'bg-white w-8' : 'bg-white/50'}`} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="card p-4 md:p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-primary-600 hover:underline text-sm font-medium">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Link href="/products?sort=-createdAt" className="text-primary-600 hover:underline text-sm font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">Get exclusive deals, new arrivals, and member-only offers.</p>
          <form onSubmit={e => e.preventDefault()} className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
            <button type="submit" className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
