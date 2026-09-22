import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';

async function getUser(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  try { return jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET!) as any; }
  catch { return null; }
}

export async function POST(req: Request) {
  try {
    const user = await getUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { items, shippingAddress, paymentMethod = 'stripe' } = await req.json();

    if (!items?.length) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });

    const productIds = items.map((i: any) => i.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const orderItems = items.map((item: any) => {
      const product = products.find(p => p._id.toString() === item.product);
      if (!product) throw new Error(`Product ${item.product} not found`);
      if (product.countInStock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);
      return {
        product: product._id,
        name: product.name,
        image: product.images[0] || '',
        price: product.price,
        quantity: item.quantity
      };
    });

    const itemsPrice = orderItems.reduce((s: number, i: any) => s + i.price * i.quantity, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = itemsPrice * 0.08;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const order = await Order.create({
      user: user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: Math.round(itemsPrice * 100) / 100,
      taxPrice: Math.round(taxPrice * 100) / 100,
      shippingPrice,
      totalPrice: Math.round(totalPrice * 100) / 100,
      isPaid: false,
      status: 'pending'
    });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { countInStock: -item.quantity } });
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 });
  }
}
