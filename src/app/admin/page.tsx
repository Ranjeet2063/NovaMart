'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiPackage, FiUsers, FiDollarSign, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/auth/login'); return; }
    fetch('/api/admin', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setStats(d))
      .catch(() => { router.push('/'); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse"><div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl" /></div>;
  if (!stats) return null;

  const chartData = stats.stats?.ordersByStatus ? {
    labels: stats.stats.ordersByStatus.map((o: any) => o._id),
    datasets: [{ data: stats.stats.ordersByStatus.map((o: any) => o.count), backgroundColor: ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6'], borderWidth: 0 }]
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: FiShoppingBag, label: 'Products', value: stats.stats?.totalProducts, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-500/10' },
          { icon: FiPackage, label: 'Orders', value: stats.stats?.totalOrders, color: 'text-accent-600', bg: 'bg-accent-50 dark:bg-accent-500/10' },
          { icon: FiUsers, label: 'Users', value: stats.stats?.totalUsers, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-500/10' },
          { icon: FiDollarSign, label: 'Revenue', value: `$${(stats.stats?.totalRevenue || 0).toLocaleString()}`, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10' }
        ].map((s, i) => (
          <div key={i} className="card p-4 md:p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}><s.icon className={`w-6 h-6 ${s.color}`} /></div>
            <div><p className="text-2xl font-bold">{s.value}</p><p className="text-sm text-gray-500">{s.label}</p></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Orders by Status</h3>
          {chartData ? <div className="h-64 flex items-center justify-center"><Doughnut data={chartData} options={{ cutout: '65%', plugins: { legend: { position: 'right' } } }} /></div> : <p className="text-gray-400 text-center py-12">No data</p>}
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {stats.recentOrders?.map((order: any) => (
              <div key={order._id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div>
                  <p className="text-sm font-medium">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-500">{order.user?.name || 'Guest'} &middot; ${order.totalPrice?.toFixed(2)}</p>
                </div>
                <span className={`badge text-xs ${
                  order.status === 'delivered' ? 'badge-success' :
                  order.status === 'cancelled' ? 'badge-danger' : 'badge-warning'
                }`}>{order.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={() => router.push('/admin/products')} className="btn-primary">Manage Products</button>
        <button onClick={() => router.push('/admin/orders')} className="btn-secondary">Manage Orders</button>
      </div>
    </div>
  );
}
