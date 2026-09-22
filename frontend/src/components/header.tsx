'use client';

import Link from 'next/link';
import { useStore } from '@/context/store';
import { Currency, Language, languages } from '@/lib/i18n';

export function Header() {
  const { cart, wishlist, currency, setCurrency, language, setLanguage, theme, toggleTheme } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 px-6 py-4 backdrop-blur dark:border-white/20 dark:bg-zinc-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold">NovaMart</Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          {['products', 'cart', 'wishlist', 'dashboard', 'orders', 'admin'].map((path) => (
            <Link key={path} href={`/${path}`} className="hover:underline">
              {path[0].toUpperCase() + path.slice(1)}
            </Link>
          ))}
          <button onClick={toggleTheme} className="rounded border px-2 py-1">
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <select
            aria-label="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="rounded border px-2 py-1"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
          </select>
          <select
            aria-label="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="rounded border px-2 py-1"
          >
            {languages.map((item) => (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </select>
          <span>Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          <span>Wishlist: {wishlist.length}</span>
        </nav>
      </div>
    </header>
  );
}
