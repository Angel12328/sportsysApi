//GENERA LAS RUTAS PARA LA GENEROS
import { Router } from 'express';
import { obtenerGeneros } from '../controllers/generos.controller.js';

const router = Router();

router.get('/', obtenerGeneros);

export default router;

