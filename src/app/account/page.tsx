'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiPackage, FiHeart, FiLogOut, FiMapPin, FiSettings } from 'react-icons/fi';
import { apiFetch } from '@/lib/utils';
import toast from 'react-hot-toast';

const tabs = [
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'orders', label: 'Orders', icon: FiPackage },
  { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
  { id: 'addresses', label: 'Addresses', icon: FiMapPin },
  { id: 'settings', label: 'Settings', icon: FiSettings }
];

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/auth/login'); return; }
    Promise.all([
      apiFetch('/users/profile'),
      apiFetch('/orders?limit=5')
    ]).then(([u, o]) => { setUser(u.user); setOrders(o.orders); })
    .catch(() => { localStorage.removeItem('token'); router.push('/auth/login'); })
    .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out');
    router.push('/');
  };

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse"><div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" /></div>;
  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-2xl font-bold text-white">
          {user.name?.[0] || 'U'}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <button onClick={handleLogout} className="ml-auto p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500">
          <FiLogOut className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm text-gray-500">Name</label><p className="font-medium">{user.name}</p></div>
            <div><label className="text-sm text-gray-500">Email</label><p className="font-medium">{user.email}</p></div>
            <div><label className="text-sm text-gray-500">Phone</label><p className="font-medium">{user.phone || 'Not set'}</p></div>
            <div><label className="text-sm text-gray-500">Member Since</label><p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p></div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="card p-8 text-center">
              <FiPackage className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500">No orders yet</p>
              <Link href="/products" className="btn-primary mt-4 inline-flex">Start Shopping</Link>
            </div>
          ) : orders.map((order: any) => (
            <Link key={order._id} href={`/orders/${order._id}`} className="card p-4 block hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">#{order._id.slice(-8).toUpperCase()}</span>
                <span className={`badge ${
                  order.status === 'delivered' ? 'badge-success' :
                  order.status === 'cancelled' ? 'badge-danger' : 'badge-warning'
                }`}>{order.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">{order.orderItems?.length} item(s)</p>
                <p className="font-semibold">${order.totalPrice?.toFixed(2)}</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="card p-6 text-center text-gray-500">
          <FiMapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No saved addresses. Add one during checkout.</p>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="card p-6 text-center text-gray-500">
          <FiSettings className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Account settings coming soon.</p>
        </div>
      )}
    </div>
  );
}
