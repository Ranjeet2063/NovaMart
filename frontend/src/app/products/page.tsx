import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';

type SearchParams = Promise<{
  search?: string;
  category?: string;
  sort?: 'newest' | 'priceAsc' | 'priceDesc' | 'ratingDesc';
  page?: string;
}>;

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const { search = '', category = '', sort = 'newest', page = '1' } = await searchParams;

  const filtered = products
    .filter((product) =>
      [product.name, product.description].join(' ').toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => (category ? product.category === category : true))
    .sort((a, b) => {
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      if (sort === 'ratingDesc') return b.rating - a.rating;
      return b.id.localeCompare(a.id);
    });

  const pageSize = 6;
  const currentPage = Math.max(Number(page), 1);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.max(Math.ceil(filtered.length / pageSize), 1);

  return (
    <div className="space-y-6 py-10">
      <h1 className="text-3xl font-bold">All Products</h1>
      <form className="grid gap-3 rounded-xl border p-4 md:grid-cols-4">
        <input name="search" placeholder="Search products" defaultValue={search} className="rounded border px-3 py-2" />
        <input name="category" placeholder="Category slug" defaultValue={category} className="rounded border px-3 py-2" />
        <select name="sort" defaultValue={sort} className="rounded border px-3 py-2">
          <option value="newest">Newest</option>
          <option value="priceAsc">Price Low to High</option>
          <option value="priceDesc">Price High to Low</option>
          <option value="ratingDesc">Top Rated</option>
        </select>
        <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Apply</button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginated.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
          <a
            key={item}
            href={`?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&sort=${sort}&page=${item}`}
            className={`rounded border px-3 py-1 ${item === currentPage ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
