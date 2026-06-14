import mongoose, { Schema, Document } from 'mongoose';

export interface IReviewDoc extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
}

const reviewSchema = new Schema<IReviewDoc>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true, trim: true },
  comment: { type: String, required: true, maxlength: 2000 },
  isVerifiedPurchase: { type: Boolean, default: false }
}, { timestamps: true });

reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

const Review = mongoose.models.Review || mongoose.model<IReviewDoc>('Review', reviewSchema);
export default Review;
