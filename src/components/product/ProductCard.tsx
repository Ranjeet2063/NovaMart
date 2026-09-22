import Link from 'next/link';
import { formatPrice, truncate } from '@/lib/utils';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/lib/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();
  const image = product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400';

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      product: product._id,
      name: product.name,
      image,
      price: product.price,
      quantity: 1
    });
    toast.success('Added to cart!');
  };

  return (
    <Link href={`/products/${product._id}`} className="card group overflow-hidden">
      <div className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
        <img src={image} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.comparePrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{Math.round((1 - product.price / product.comparePrice) * 100)}%
          </span>
        )}
        <button onClick={handleAdd}
          className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-600 hover:text-white">
          <FiShoppingCart className="w-4 h-4" />
        </button>
      </div>
      <div className="p-3 md:p-4">
        {product.brand && <p className="text-xs text-gray-400 mb-1">{product.brand}</p>}
        <h3 className="font-medium text-sm md:text-base truncate">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          {[1,2,3,4,5].map(i => (
            <FiStar key={i} className={`w-3 h-3 ${i <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.numReviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-primary-600">{formatPrice(product.price)}</span>
          {product.comparePrice && <span className="text-xs text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>}
        </div>
      </div>
    </Link>
  );
}
