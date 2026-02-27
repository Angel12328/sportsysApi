// Importar dotenv lo más arriba posible
import 'dotenv/config';
// o si usas CommonJS: require('dotenv').config();

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Ejemplo de acceso a variables
console.log(`Entorno de ejecución: ${process.env.NODE_ENV}`);

// 1. Middlewares globales
// Permite que la API reciba datos en formato JSON en el body (para POST, PUT, etc.)
app.use(express.json());

// 2. Conectar a Base de Datos (SQL Server)
import { connectToDatabase } from './src/config/db.js';

// Iniciamos la conexión
connectToDatabase();

// --- PRIMEROS ENDPOINTS ---

// GET /api/health - Endpoint de salud para verificar que el servidor está vivo
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'La API de Sportsys está viva y funcionando'
    });
});

// GET /api/deportes - Endpoint para obtener todos los deportes
app.get('/api/deportes', (req, res) => {
    // Mock temporal: Más adelante, aquí haremos una consulta SELECT a la base de datos
    const deportes = [
        { id: 1, nombre: 'Fútbol' },
        { id: 2, nombre: 'Baloncesto' },
        { id: 3, nombre: 'Béisbol' }
    ];
    res.status(200).json(deportes);
});

// POST /api/deportes - Endpoint para guardar un nuevo deporte
app.post('/api/deportes', (req, res) => {
    // Extraemos los datos del cuerpo (body) de la petición
    const nuevoDeporte = req.body;

    // Validación súper básica
    if (!nuevoDeporte.nombre) {
        return res.status(400).json({ error: 'El nombre del deporte es obligatorio' });
    }

    console.log('Guardando nuevo deporte en BD:', nuevoDeporte);

    // Mock temporal: Más adelante, aquí haremos un INSERT en la base de datos
    res.status(201).json({
        message: 'Deporte creado con éxito',
        data: nuevoDeporte
    });
});

app.listen(PORT, () => {
    console.log(`API de Gestión Deportiva corriendo en el puerto ${PORT}`);
});
