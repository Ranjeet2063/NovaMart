import { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '../models/User';
import { createToken } from '../services/token';
import { asyncHandler } from '../utils/asyncHandler';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const existing = await User.findOne({ email: data.email });

  if (existing) {
    res.status(400);
    throw new Error('Email already exists');
  }

  const user = await User.create(data);
  const token = createToken(user.id);

  res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const user = await User.findOne({ email: data.email }).select('+password');

  if (!user || !(await user.matchPassword(data.password))) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const token = createToken(user.id);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});
