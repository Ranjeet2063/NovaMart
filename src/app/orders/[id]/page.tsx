'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiPackage, FiMapPin, FiCreditCard, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { apiFetch, formatPrice } from '@/lib/utils';

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/orders/${id}`).then(d => setOrder(d.order)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse"><div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" /></div>;
  if (!order) return <div className="text-center py-16 text-gray-400">Order not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <Link href="/account" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-6">
        <FiArrowLeft className="w-4 h-4" /> Back to Account
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Order #{order._id.slice(-8).toUpperCase()}</h1>
          <p className="text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className={`badge ${
          order.status === 'delivered' ? 'badge-success' :
          order.status === 'cancelled' ? 'badge-danger' : 'badge-warning'
        } text-sm px-4 py-1.5`}>{order.status}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-4">
          <FiPackage className="w-5 h-5 text-primary-600 mb-2" />
          <p className="text-sm text-gray-500">Items</p>
          <p className="font-semibold">{order.orderItems?.length} item(s)</p>
        </div>
        <div className="card p-4">
          <FiCreditCard className="w-5 h-5 text-primary-600 mb-2" />
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-semibold">{formatPrice(order.totalPrice)}</p>
        </div>
        <div className="card p-4">
          <FiCheck className={`w-5 h-5 mb-2 ${order.isPaid ? 'text-green-500' : 'text-gray-400'}`} />
          <p className="text-sm text-gray-500">Payment</p>
          <p className="font-semibold">{order.isPaid ? 'Paid' : 'Pending'}</p>
        </div>
      </div>

      <div className="card p-6 mb-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2"><FiMapPin /> Shipping Address</h2>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p>{order.shippingAddress?.fullName}</p>
          <p>{order.shippingAddress?.street}</p>
          <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}</p>
          <p>{order.shippingAddress?.phone}</p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold mb-4">Order Items</h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {order.orderItems?.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity} x ${item.price}</p>
              </div>
              <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${order.itemsPrice?.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>${order.shippingPrice?.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>${order.taxPrice?.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200 dark:border-gray-700">
            <span>Total</span><span>${order.totalPrice?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
