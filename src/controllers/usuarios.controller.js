import { UsuarioModel } from '../models/usuario.model.js';

export const crearUsuario = async (req, res, next) => {
    try {
        const nuevoUsuario = req.body;
        if (!nuevoUsuario.pnombre || !nuevoUsuario.snombre || !nuevoUsuario.papellido || !nuevoUsuario.sapellido || !nuevoUsuario.generoId || !nuevoUsuario.paisId || !nuevoUsuario.edad < 18 || !nuevoUsuario.email || !nuevoUsuario.password || !nuevoUsuario.rol) {
            return res.status(400).json({ message: 'Revise que todos los campos obligatorios estén completos' });
        }
        // NOTA IMPORTANTE: Encriptar el password (ej: bcrypt.hash) ANTES de enviarlo al Model
        const hashedPassword = bcrypt.hashSync(nuevoUsuario.password, 10);
        console.log('Intentando guardar nuevo usuario en BD:', { ...nuevoUsuario, password: hashedPassword }); // 

        const usuarioCreado = await UsuarioModel.create(nuevoUsuario);
        res.status(201).json({
            message: 'Usuario creado con éxito',
            data: usuarioCreado
        });
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};

export const obtenerUsuarioLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const usuario = await UsuarioModel.login(email, password);
        res.status(200).json(usuario);

    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};
//crear procedimiento almacenado sp_GetUsuarioById
export const obtenerUsuarioPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await UsuarioModel.getUserId(id);
        res.status(200).json(usuario);
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};

//crear procedimiento almacenado sp_GetAllUsuarios
export const obtenerUsuarios = async (req, res, next) => {
    try {
        const usuarios = await UsuarioModel.getAll();
        res.status(200).json(usuarios);
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};

export const actualizarUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuarioActualizado = await UsuarioModel.update(id, req.body);
        res.status(200).json({
            message: 'Usuario actualizado con éxito',
            data: usuarioActualizado
        });
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};

export const eliminarUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuarioEliminado = await UsuarioModel.delete(id);
        res.status(200).json({
            message: 'Usuario eliminado con éxito',
            data: usuarioEliminado
        });
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};
