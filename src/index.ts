import dotenv from 'dotenv';
import { connectDB } from './config/db';
import models from './models';  // Importamos el array de modelos
import app from './server'; // Importamos la aplicación del servidor

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const PORT = process.env.PORT; // Definir el puerto por defecto si no existe en el .env

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conexión a la base de datos establecida.');

    // Sincronizar los modelos
    for (const model of models) {
      await model.sync(); // Sincroniza cada modelo manualmente
    }
    console.log('Modelos sincronizados con la base de datos');

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

// Llamar a la función para iniciar el servidor
startServer();
