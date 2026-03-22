import { Router } from 'express';
import { obtenerDeportes, crearDeporte } from '../controllers/deportes.controller.js';
import { validateDeporte } from '../middlewares/validateDeporte.js';

const router = Router();

router.get('/', obtenerDeportes);
router.post('/', validateDeporte, crearDeporte);

export default router;
