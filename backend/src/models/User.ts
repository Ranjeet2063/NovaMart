import bcrypt from 'bcryptjs';
import mongoose, { InferSchemaType, Model } from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    line1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    preferredLanguage: { type: String, default: 'en' },
    preferredCurrency: { type: String, default: 'USD' },
    addresses: [addressSchema]
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function matchPassword(entered: string): Promise<boolean> {
  return bcrypt.compare(entered, this.password);
};

type UserType = InferSchemaType<typeof userSchema> & {
  matchPassword: (entered: string) => Promise<boolean>;
};

export const User = (mongoose.models.User as Model<UserType>) || mongoose.model<UserType>('User', userSchema);
