import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const rawBody = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(rawBody, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as any;
      await connectDB();

      await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
        isPaid: true,
        paidAt: new Date(),
        status: 'processing',
        'paymentResult': { id: paymentIntent.id, status: 'succeeded' }
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
