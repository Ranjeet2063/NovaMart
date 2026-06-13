'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Currency, currencyRates, Language } from '@/lib/i18n';

type CartItem = { productId: string; quantity: number };

type StoreContextType = {
  cart: CartItem[];
  wishlist: string[];
  language: Language;
  currency: Currency;
  theme: 'light' | 'dark';
  addToCart: (productId: string, quantity?: number) => void;
  addToWishlist: (productId: string) => void;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
  toggleTheme: () => void;
  convertPrice: (usdPrice: number) => number;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'novamart-store';

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<StoreContextType>;
      if (parsed.cart) setCart(parsed.cart);
      if (parsed.wishlist) setWishlist(parsed.wishlist);
      if (parsed.language) setLanguage(parsed.language);
      if (parsed.currency) setCurrency(parsed.currency);
      if (parsed.theme) setTheme(parsed.theme);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cart, wishlist, language, currency, theme })
    );
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [cart, wishlist, language, currency, theme]);

  const value = useMemo<StoreContextType>(
    () => ({
      cart,
      wishlist,
      language,
      currency,
      theme,
      addToCart: (productId, quantity = 1) => {
        setCart((prev) => {
          const found = prev.find((item) => item.productId === productId);
          if (found) {
            return prev.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prev, { productId, quantity }];
        });
      },
      addToWishlist: (productId) => {
        setWishlist((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
      },
      setLanguage,
      setCurrency,
      toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
      convertPrice: (usdPrice) => usdPrice * currencyRates[currency]
    }),
    [cart, wishlist, language, currency, theme]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
}
