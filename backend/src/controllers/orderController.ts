import { Response } from 'express';
import { z } from 'zod';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';
import { stripe } from '../services/stripe';

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive()
    })
  ),
  shippingAddress: z.object({
    line1: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.string()
  })
});

export const createCheckoutSession = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = checkoutSchema.parse(req.body);

  const products = await Product.find({ _id: { $in: data.items.map((item) => item.productId) } });
  const items = data.items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    if (product.inventory < item.quantity) {
      throw new Error(`Insufficient inventory for ${product.name}`);
    }

    return {
      product,
      quantity: item.quantity,
      subtotal: product.price * item.quantity
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * 0.1;
  const shippingFee = subtotal > 100 ? 0 : 8;
  const total = subtotal + tax + shippingFee;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency: 'usd',
    automatic_payment_methods: { enabled: true }
  });

  const order = await Order.create({
    user: req.userId,
    items: items.map((item) => ({
      product: item.product.id,
      name: item.product.name,
      image: item.product.images[0],
      quantity: item.quantity,
      price: item.product.price
    })),
    shippingAddress: data.shippingAddress,
    subtotal,
    tax,
    shippingFee,
    total,
    stripePaymentIntentId: paymentIntent.id,
    invoiceNumber: `INV-${Date.now()}`
  });

  res.status(201).json({
    orderId: order.id,
    clientSecret: paymentIntent.client_secret,
    total
  });
});

export const getMyOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(orders);
});
