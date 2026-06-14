import mongoose, { Schema, Document } from 'mongoose';

export interface ICategoryDoc extends Document {
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parentCategory?: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategoryDoc>({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  image: String,
  description: String,
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model<ICategoryDoc>('Category', categorySchema);
export default Category;
