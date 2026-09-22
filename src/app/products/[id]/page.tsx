'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { formatPrice } from '@/lib/utils';
import { apiFetch } from '@/lib/utils';
import ProductCard from '@/components/product/ProductCard';
import { FiStar, FiShoppingCart, FiHeart, FiCheck, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState<any[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    apiFetch(`/products/${id}`).then(d => {
      setProduct(d.product);
      return apiFetch(`/products?category=${d.product.category?._id || d.product.category}&limit=4`);
    }).then(d => setRelated(d.products.filter((p: any) => p._id !== id)))
    .catch(() => {})
    .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse"><div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl" /></div>;
  if (!product) return <div className="text-center py-16 text-gray-400">Product not found</div>;

  const images = product.images?.length ? product.images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'];

  const handleAdd = () => {
    addItem({
      product: product._id,
      name: product.name,
      image: images[0],
      price: product.price,
      quantity
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
            <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3">
            {images.map((img: string, i: number) => (
              <button key={i} onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${i === selectedImage ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2">
            {product.brand && <span className="text-sm text-gray-500">{product.brand}</span>}
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{product.name}</h1>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <FiStar key={i} className={`w-5 h-5 ${i <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.numReviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.comparePrice && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-green-600 mb-6">
            <FiCheck className="w-4 h-4" />
            {product.countInStock > 0 ? `In Stock (${product.countInStock} available)` : 'Out of Stock'}
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 border-r border-gray-300 dark:border-gray-600">-</button>
              <span className="px-6 py-2.5 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 border-l border-gray-300 dark:border-gray-600">+</button>
            </div>
            <button onClick={handleAdd} disabled={product.countInStock === 0} className="btn-primary flex-1">
              <FiShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-500/10">
              <FiHeart className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="text-center"><FiTruck className="w-5 h-5 mx-auto mb-1 text-primary-600" /><span className="text-xs text-gray-500">Free shipping</span></div>
            <div className="text-center"><FiShield className="w-5 h-5 mx-auto mb-1 text-primary-600" /><span className="text-xs text-gray-500">Secure checkout</span></div>
            <div className="text-center"><FiRefreshCw className="w-5 h-5 mx-auto mb-1 text-primary-600" /><span className="text-xs text-gray-500">Easy returns</span></div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
