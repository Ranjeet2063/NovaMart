'use client';
import { useCart } from '@/lib/CartContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, subtotal, clearCart, itemCount } = useCart();

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)} />}
      <div className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <FiShoppingBag className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Cart ({itemCount})</h2>
            </div>
            <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <FiShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button onClick={() => setOpen(false)} className="btn-primary">
                  <Link href="/products">Start Shopping</Link>
                </button>
              </div>
            ) : items.map(item => (
              <div key={item.product} className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="w-20 h-20 rounded-lg bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-sm text-primary-600 font-semibold mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.product, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FiMinus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FiPlus className="w-3 h-3" />
                    </button>
                    <button onClick={() => removeItem(item.product)}
                      className="ml-auto p-1.5 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg text-red-500">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-semibold">{subtotal > 100 ? 'Free' : '$10.00'}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span>{formatPrice(subtotal + (subtotal > 100 ? 0 : 10))}</span>
              </div>
              <Link href="/checkout" onClick={() => setOpen(false)}
                className="btn-primary w-full">
                Proceed to Checkout
              </Link>
              <button onClick={clearCart} className="w-full text-center text-sm text-gray-500 hover:text-red-500">
                Clear cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
