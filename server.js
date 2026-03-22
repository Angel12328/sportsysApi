// Importar dotenv lo más arriba posible
import 'dotenv/config';
// o si usas CommonJS: require('dotenv').config();

import express from 'express';
import { connectToDatabase } from './src/config/db.js';
import healthRoutes from './src/routes/health.routes.js';
import deportesRoutes from './src/routes/deportes.routes.js';
import usuariosRoutes from './src/routes/usuarios.routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Ejemplo de acceso a variables
console.log(`Entorno de ejecución: ${process.env.NODE_ENV}`);

// 1. Middlewares globales
// Permite que la API reciba datos en formato JSON en el body (para POST, PUT, etc.)
app.use(express.json());

// 2. Conectar a Base de Datos (SQL Server)
// Iniciamos la conexión
connectToDatabase();

// 3. Rutas
app.use('/api/health', healthRoutes);
app.use('/api/deportes', deportesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// 4. Middleware de manejo de errores (siempre al final de las rutas)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`API de Gestión Deportiva corriendo en el puerto ${PORT}`);
});
