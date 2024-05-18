import { Request, Response } from 'express';
import { generateToken } from '../services/auth-token';
import {
  passwordEncryptor,
  passwordCompare,
} from '../services/password-encryptor';
import { Prisma } from '@prisma/client';
import prisma from '../models/user';

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.body;
    user.password = passwordEncryptor(user.password);
    const newUser = await prisma.create({
      data: {
        ...user,
      },
    });
    const token = generateToken(newUser);
    res.header('auth-token', token);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error?.code === 'P2002') {
        res.status(400).json({
          message: 'The email used already exists',
        });
        return;
      }
    }
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.body;

    const userFound = await prisma.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userFound) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const passwordMatch = await passwordCompare(
      user.password,
      userFound.password
    );

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid Credentials' });
      return;
    }

    const token = generateToken(userFound);
    res.header('auth-token', token);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
