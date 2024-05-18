import { z } from 'zod';

export const Register = z
  .object({
    username: z
      .string({ message: 'Username is required' })
      .min(5, { message: 'Must be 5 or more characters long' }),
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ message: 'Password is required' })
      .min(5, { message: 'Must be 5 or more characters long' }),
  })
  .strict();

export const Login = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ message: 'Password is required' })
    .min(5, { message: 'Must be 5 or more characters long' }),
});
