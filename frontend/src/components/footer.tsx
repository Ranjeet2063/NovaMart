export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 px-6 py-8 text-sm dark:border-white/20">
      <div className="mx-auto grid max-w-6xl gap-3 text-center md:text-left">
        <p>© {new Date().getFullYear()} NovaMart. All rights reserved.</p>
        <p>Built for scale: Next.js 15, Express, MongoDB, JWT, Stripe.</p>
      </div>
    </footer>
  );
}
