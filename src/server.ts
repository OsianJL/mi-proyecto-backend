import express, { Application } from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

// Crear la aplicación Express
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/api', userRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando correctamente con TypeScript y Express');
});

export default app; // Exportamos la aplicación para que se use en otro lugar
