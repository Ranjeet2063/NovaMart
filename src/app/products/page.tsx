'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { SORT_OPTIONS } from '@/types';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';
import { apiFetch } from '@/lib/utils';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('-createdAt');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  useEffect(() => {
    apiFetch('/categories').then(d => setCategories(d.categories)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (page) params.set('page', page.toString());
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);

    apiFetch(`/products?${params}`)
      .then(d => { setProducts(d.products); setTotalPages(d.pagination.pages); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, category, search, sort, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}</h1>
          {search && <p className="text-gray-500 mt-1">Results for &quot;{search}&quot;</p>}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-600' : 'text-gray-400 hover:bg-gray-100'}`}>
            <FiGrid className="w-5 h-5" />
          </button>
          <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-600' : 'text-gray-400 hover:bg-gray-100'}`}>
            <FiList className="w-5 h-5" />
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)} className="input-field w-40 text-sm">
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary lg:hidden">
            <FiFilter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className={`w-64 flex-shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-1">
              <a href="/products" className="block px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800">All</a>
              {categories.map((c: any) => (
                <a key={c._id} href={`/products?category=${c.slug}`}
                  className={`block px-3 py-1.5 rounded-lg text-sm ${category === c.slug ? 'bg-primary-50 dark:bg-primary-500/20 text-primary-600 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  {c.name}
                </a>
              ))}
            </div>
          </div>
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="flex gap-2">
              <input type="number" placeholder="Min" className="input-field text-sm" />
              <input type="number" placeholder="Max" className="input-field text-sm" />
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="card animate-pulse">
                  <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-t-xl" />
                  <div className="p-4 space-y-2"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" /><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" /></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No products found</p>
            </div>
          ) : (
            <div className={view === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'
              : 'space-y-4'
            }>
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium ${page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
