import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';
import { User } from '../models/User';

interface JwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : undefined;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
  } catch {
    res.status(401);
    throw new Error('Invalid or expired token');
  }

  const user = await User.findById(decoded.userId).select('_id role');

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  req.userId = user.id;
  next();
};

export const adminOnly = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.userId) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const user = await User.findById(req.userId).select('role');

  if (!user || user.role !== 'admin') {
    res.status(403);
    throw new Error('Admin access required');
  }

  next();
};
