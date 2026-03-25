import { generoModel } from "../models/genero.model";

export const obtenerGeneros = async (req, res, next) => {
    try {
        const generos = await generoModel.getAll();
        if (!generos) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        res.status(200).json(generos);
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};

export const crearGenero = async (req, res, next) => {
    try {
        const nuevoGenero = req.body;
        console.log('Guardando nuevo genero en BD:', nuevoGenero);

        const generoCreado = await generoModel.create(nuevoGenero);
        res.status(201).json({
            message: 'Genero creado con éxito',
            data: generoCreado 
        });
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    };
};

export const actualizarGenero = async (req, res, next) => {
    try {
        const { id } = req.params;
        const generoActualizado = await generoModel.update(id, req.body);
        res.status(200).json({
            message: 'Usuario actualizado con éxito',
            data: generoActualizado
        });
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};

export const eliminarUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const generoEliminado = await generoModelModel.delete(id);
        res.status(200).json({
            message: 'Usuario eliminado con éxito',
            data: usuarioEliminado
        });
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};
