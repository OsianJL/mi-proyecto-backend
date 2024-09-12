import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string, // Nombre de la base de datos
  process.env.DB_USER as string, // Usuario de la base de datos
  process.env.DB_PASSWORD as string, // Contraseña
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Base de datos PostgreSQL
    port: Number(process.env.DB_PORT), // Puerto donde está corriendo PostgreSQL
    logging: console.log,
 // Desactiva el logging de SQL (opcional)
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Error conecting to the database:', error);
  }
};
