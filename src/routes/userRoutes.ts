import express from 'express';
import { createUser, getUsers } from '../controllers/userController'; // Importar función para obtener usuarios

const router = express.Router();

// Ruta para crear un usuario
router.post('/users', createUser);

// Ruta para obtener todos los usuarios
router.get('/users', getUsers);  // Nueva ruta para obtener usuarios

export default router;

