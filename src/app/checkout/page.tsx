'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { formatPrice } from '@/lib/utils';
import { FiCreditCard, FiMapPin, FiPackage, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', state: '', zip: '', phone: ''
  });

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setProcessing(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) { toast.error('Please login first'); router.push('/auth/login'); return; }

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          items: items.map(i => ({ product: i.product, quantity: i.quantity })),
          shippingAddress: address
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success('Order placed successfully!');
      clearCart();
      router.push(`/orders/${data.order._id}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <FiPackage className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some items to your cart before checking out.</p>
        <button onClick={() => router.push('/products')} className="btn-primary">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>{s}</div>
            <span className={`text-sm font-medium ${step >= s ? 'text-primary-600' : 'text-gray-500'}`}>
              {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
            </span>
            {s < 3 && <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiMapPin /> Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input type="text" value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})}
                    className="input-field" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Street Address</label>
                  <input type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})}
                    className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input type="text" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP Code</label>
                  <input type="text" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input type="tel" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="input-field" />
                </div>
              </div>
              <button onClick={() => setStep(2)} className="btn-primary mt-6">Continue to Payment</button>
            </div>
          )}

          {step === 2 && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiCreditCard /> Payment Method</h2>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="accent-primary-600" />
                  <div><p className="font-medium">Credit/Debit Card</p><p className="text-sm text-gray-500">Pay securely with Stripe</p></div>
                </label>
              </div>
              <button onClick={() => setStep(3)} className="btn-primary">Continue to Review</button>
            </div>
          )}

          {step === 3 && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiCheck /> Order Review</h2>
              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={item.product} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm"><strong>Ship to:</strong> {address.fullName}, {address.street}, {address.city}, {address.state} {address.zip}</p>
              </div>
              <button onClick={handlePlaceOrder} disabled={processing} className="btn-primary w-full mt-6">
                {processing ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
              </button>
            </div>
          )}
        </div>

        <div className="card p-6 h-fit">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            {items.map(item => (
              <div key={item.product} className="flex justify-between">
                <span className="text-gray-500 truncate">{item.name} x{item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>{formatPrice(tax)}</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
