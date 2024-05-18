import { Request, Response } from 'express';
import prisma from '../models/user';
import { passwordEncryptor } from '../services/password-encryptor';

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log('goood job');
    const users = await prisma.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUsersByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(401).json({ message: 'ID not provided' });
      return;
    }
    const user = await prisma.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;

    if (!id) {
      res.status(401).json({ message: 'ID not provided' });
      return;
    }

    if (dataToUpdate.password) {
      const passwordHashed = passwordEncryptor(dataToUpdate.password);
      dataToUpdate.password = passwordHashed;
    }

    const user = await prisma.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(401).json({ message: 'ID not provided' });
      return;
    }

    const user = await prisma.delete({
      where: { id: parseInt(id) },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'Delete successfully' });
  } catch (error) {
    console.log(error);
  }
};
