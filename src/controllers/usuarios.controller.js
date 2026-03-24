import { UsuarioModel } from '../models/usuario.model.js';

export const crearUsuario = async (req, res, next) => {
    try {
        const nuevoUsuario = req.body;
        
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
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);

    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};

export const obtenerUsuarioPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await UsuarioModel.getUserId(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};


export const obtenerUsuarios = async (req, res, next) => {
    try {
        const usuarios = await UsuarioModel.getAll();
        if (!usuarios) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
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
