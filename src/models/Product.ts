import mongoose, { Schema, Document } from 'mongoose';

export interface IProductDoc extends Document {
  name: string;
  slug: string;
  description: string;
  richDescription?: string;
  images: string[];
  brand: string;
  price: number;
  comparePrice?: number;
  category: mongoose.Types.ObjectId;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  tags: string[];
  specifications: { key: string; value: string }[];
}

const productSchema = new Schema<IProductDoc>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  richDescription: String,
  images: [{ type: String }],
  brand: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  comparePrice: { type: Number, min: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  countInStock: { type: Number, required: true, min: 0, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  tags: [String],
  specifications: [{ key: String, value: String }]
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: 1, rating: -1 });

const Product = mongoose.models.Product || mongoose.model<IProductDoc>('Product', productSchema);
export default Product;
