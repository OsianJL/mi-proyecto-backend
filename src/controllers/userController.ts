import { Request, Response, NextFunction } from 'express';
import { isEmailOrPhoneInUse, createNewUser, fetchAllUsers } from '../services/userService';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Verificar si el email o número de teléfono ya están en uso
    const existingUser = await isEmailOrPhoneInUse(email, phoneNumber);

    if (existingUser) {
      return res.status(400).json({ message: 'El email o número de teléfono ya están en uso.' });
    }

    // Crear el usuario
    const newUser = await createNewUser({ name, email, password, phoneNumber });

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
        status: newUser.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await fetchAllUsers(); // Obtener todos los usuarios
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
