import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'NovaMart | Modern E-commerce Platform',
  description:
    'Production-ready e-commerce platform with Next.js 15, Express, MongoDB, JWT authentication and Stripe payments.',
  keywords: ['NovaMart', 'ecommerce', 'nextjs', 'stripe', 'mongodb']
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-6xl px-6">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
