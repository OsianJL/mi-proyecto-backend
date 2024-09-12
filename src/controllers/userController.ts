import type { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ msg: 'the user was successfully created:', user });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.findAll(); // Obtener todos los usuarios
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
