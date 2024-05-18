import jwt from 'jsonwebtoken';
import { User } from '../schemas/user.type';

export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'default-secret'
  );
};
