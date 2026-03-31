import { Router } from "express";
import { actualizarPais, crearPais, eliminarPais, obtenerPaises } from "../controllers/pais.controller.js";
import { validateAccionPais, validateIdPais, validatePais } from "../middlewares/validatePais.js";

const router = Router();

router.get('/', validateAccionPais,obtenerPaises);
router.get('/:id', validateAccionPais,obtenerPaises);
router.post('/',validatePais,crearPais);
router.put('/:id',validateIdPais, actualizarPais); 
router.delete('/:id', validateIdPais,eliminarPais);

export default router;