import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Category } from '../models/Category';
import { asyncHandler } from '../utils/asyncHandler';

export const getDashboardMetrics = asyncHandler(async (_req: Request, res: Response) => {
  const [products, categories, customers, orders, salesAgg] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    User.countDocuments({ role: 'customer' }),
    Order.countDocuments(),
    Order.aggregate([{ $group: { _id: null, revenue: { $sum: '$total' } } }])
  ]);

  res.json({
    products,
    categories,
    customers,
    orders,
    revenue: salesAgg[0]?.revenue ?? 0
  });
});
