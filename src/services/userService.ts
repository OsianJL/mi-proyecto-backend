import User from '../models/User';
import { Op } from 'sequelize';
import { UserCreationAttributes } from '../types/User'; // Si usas una interfaz para los atributos de usuario

// Función para verificar si un email o número de teléfono ya está en uso
export const isEmailOrPhoneInUse = async (email: string, phoneNumber: string) => {
  return await User.findOne({
    where: {
      [Op.or]: [{ email }, { phoneNumber }],
    },
  });
};

// Función para crear un nuevo usuario
export const createNewUser = async (userData: UserCreationAttributes) => {
  return await User.create(userData);
};

// Función para obtener todos los usuarios
export const fetchAllUsers = async () => {
  return await User.findAll();
};
