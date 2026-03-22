import { Router } from 'express';
import { obtenerUsuarios, crearUsuario } from '../controllers/usuarios.controller.js';
import { validateUsuario } from '../middlewares/validateUsuario.js';

const router = Router();

router.get('/', obtenerUsuarios);
router.post('/', validateUsuario, crearUsuario);

export default router;
