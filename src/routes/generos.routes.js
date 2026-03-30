//GENERA LAS RUTAS PARA LA GENEROS
import { Router } from 'express';
import { crearGenero, obtenerGeneros,actualizarGenero,eliminarGenero} from '../controllers/generos.controller.js';
import { validateAccionGenero, validateGenero, validateIdGenero } from '../middlewares/validateGenero.js';

const router = Router();

router.get('/', validateAccionGenero,obtenerGeneros);
router.get('/:id', validateAccionGenero,obtenerGeneros);
router.post('/',validateGenero,crearGenero);
router.put('/:id',validateIdGenero, actualizarGenero); 
router.delete('/:id', validateIdGenero,eliminarGenero);

export default router;

