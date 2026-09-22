import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], required: true },
    shippingAddress: {
      line1: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },
    paymentMethod: { type: String, enum: ['card', 'cod'], default: 'card' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderStatus: {
      type: String,
      enum: ['processing', 'packed', 'shipped', 'delivered', 'cancelled'],
      default: 'processing'
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    total: { type: Number, required: true },
    stripePaymentIntentId: { type: String, default: '' },
    invoiceNumber: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
