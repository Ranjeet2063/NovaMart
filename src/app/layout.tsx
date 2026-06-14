import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import CartProvider from '@/lib/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NovaMart - Premium Shopping Experience',
  description: 'Discover premium products at unbeatable prices. Shop electronics, fashion, home goods and more.',
  keywords: 'ecommerce, shop, online store, electronics, fashion, home goods',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-right" toastOptions={{
            duration: 3000,
            style: { borderRadius: '10px', padding: '12px 16px' }
          }} />
        </CartProvider>
      </body>
    </html>
  );
}
