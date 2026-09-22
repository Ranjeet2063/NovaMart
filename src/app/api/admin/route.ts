import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import Product from '@/models/Product';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';

async function getAdmin(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    const user = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET!) as any;
    if (user.role !== 'admin') return null;
    return user;
  } catch { return null; }
}

export async function GET(req: Request) {
  try {
    const admin = await getAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const [totalUsers, totalProducts, totalOrders, totalRevenue] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([{ $match: { isPaid: true } }, { $group: { _id: null, total: { $sum: '$totalPrice' } } }])
    ]);

    const recentOrders = await Order.find().populate('user', 'name email').sort('-createdAt').limit(5);
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    return NextResponse.json({
      stats: {
        totalUsers, totalProducts, totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        ordersByStatus
      },
      recentOrders
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
