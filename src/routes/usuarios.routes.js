import { Router } from 'express';
import { obtenerUsuarios, crearUsuario, obtenerUsuarioPorId, obtenerUsuarioLogin,actualizarUsuario, eliminarUsuario} from '../controllers/usuarios.controller.js';
import { validateLogin, validateUsuario } from '../middlewares/validateUsuario.js';

const router = Router();

router.post('/create', validateUsuario, crearUsuario);
router.get('/login',validateLogin, obtenerUsuarioLogin);
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);



export default router;
