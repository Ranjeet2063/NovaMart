import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderDoc extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: {
    product: mongoose.Types.ObjectId;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  paymentResult?: { id: string; status: string; update_time: string };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
}

const orderSchema = new Schema<IOrderDoc>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String, image: String, price: Number, quantity: { type: Number, required: true }
  }],
  shippingAddress: {
    fullName: String, street: String, city: String,
    state: String, zip: String, country: String, phone: String
  },
  paymentMethod: { type: String, required: true, default: 'stripe' },
  paymentResult: { id: String, status: String, update_time: String },
  itemsPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true, default: 0 },
  shippingPrice: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  isDelivered: { type: Boolean, default: false },
  deliveredAt: Date,
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  trackingNumber: String
}, { timestamps: true });

orderSchema.index({ user: 1, createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model<IOrderDoc>('Order', orderSchema);
export default Order;
