import Link from 'next/link';

const footerLinks = {
  Shop: [
    { href: '/products', label: 'All Products' },
    { href: '/deals', label: 'Deals & Offers' },
    { href: '/new-arrivals', label: 'New Arrivals' },
    { href: '/best-sellers', label: 'Best Sellers' }
  ],
  Support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/returns', label: 'Returns & Exchanges' }
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-lg font-bold">NovaMart</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Premium shopping experience with curated products, fast delivery, and exceptional customer service.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram', 'youtube'].map(social => (
                <a key={social} href="#" className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors">
                  <span className="text-xs font-medium capitalize text-gray-600 dark:text-gray-400">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">&copy; 2024 NovaMart. All rights reserved.</p>
          <div className="flex gap-4">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].join(' · ')}
          </div>
        </div>
      </div>
    </footer>
  );
}
