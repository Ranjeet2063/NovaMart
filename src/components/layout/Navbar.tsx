'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '@/lib/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/categories/electronics', label: 'Electronics' },
  { href: '/categories/clothing', label: 'Clothing' },
  { href: '/categories/home-kitchen', label: 'Home' },
  { href: '/deals', label: 'Deals' }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { itemCount, isOpen, setOpen } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 -ml-2">
                {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
              <Link href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-xl font-bold hidden sm:block">NovaMart</span>
              </Link>
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2">
              {searchOpen ? (
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5">
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search products..." className="bg-transparent outline-none text-sm w-40 sm:w-64"
                    autoFocus onBlur={() => !search && setSearchOpen(false)} onKeyDown={e => {
                      if (e.key === 'Enter' && search) window.location.href = `/products?search=${search}`;
                    }} />
                  <FiSearch className="w-4 h-4 text-gray-400" />
                </div>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <FiSearch className="w-5 h-5" />
                </button>
              )}
              <Link href="/wishlist" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg hidden sm:block">
                <FiHeart className="w-5 h-5" />
              </Link>
              <Link href="/account" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <FiUser className="w-5 h-5" />
              </Link>
              <button onClick={() => setOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative">
                <FiShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 animate-slide-down">
            <nav className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  {link.label}
                </Link>
              ))}
              <Link href="/wishlist" onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 sm:hidden">
                Wishlist
              </Link>
            </nav>
          </div>
        )}
      </header>
      <CartDrawer />
    </>
  );
}
