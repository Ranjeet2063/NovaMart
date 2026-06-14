import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';

async function getUser(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  try { return jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET!) as any; }
  catch { return null; }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const product = searchParams.get('product');
    if (!product) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

    await connectDB();
    const reviews = await Review.find({ product }).populate('user', 'name image').sort('-createdAt');
    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { productId, rating, title, comment } = await req.json();

    const existing = await Review.findOne({ user: user.id, product: productId });
    if (existing) return NextResponse.json({ error: 'Already reviewed this product' }, { status: 409 });

    const review = await Review.create({
      user: user.id,
      product: productId,
      rating, title, comment
    });

    const reviews = await Review.find({ product: productId });
    const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(avgRating * 10) / 10,
      numReviews: reviews.length
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
