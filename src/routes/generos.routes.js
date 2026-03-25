//GENERA LAS RUTAS PARA LA GENEROS
import { Router } from 'express';
import { crearGenero, obtenerGeneros } from '../controllers/generos.controller.js';
import { validateGenero } from '../middlewares/validateGenero.js';

const router = Router();

router.get('/', obtenerGeneros);
router.get('/:id', obtenerGeneros);
router.post('/',validateGenero,crearGenero);
router.put('/:id', actualizarGenero);
router.delete('/:id', eliminarGenero);

export default router;

