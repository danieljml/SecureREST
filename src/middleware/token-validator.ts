import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const tokenValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const secret = process.env.JWT_SECRET || 'default-secret';
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).json({ message: 'Token expired' });
        }
        if (err instanceof jwt.JsonWebTokenError) {
          return res.status(403).json({ message: 'Token not valid' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      next();
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
