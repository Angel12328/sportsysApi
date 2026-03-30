import { paisModel } from "../models/genero.model";

export const obtenerPaises = async (req, res, next) => {
    try {
        const paises = await paisModel.getAll();
        if (!generos) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        res.status(200).json(generos);
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};

export const crearPais = async (req, res, next) => {
    try {
        const nuevoPais = req.body;
        console.log('Guardando nuevo pais en BD:', nuevoPais);

        const paisCreado = await paisModel.create(nuevoPais);
        res.status(201).json({
            message: 'pais creado con éxito',
            data: paisCreado 
        });
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    };
};

export const actualizarPais = async (req, res, next) => {
    try {
        const { id } = req.params;
        const paisActualizado = await paisModel.update(id, req.body);
        res.status(200).json({
            message: 'pais actualizado con éxito',
            data: paisActualizado
        });
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};

export const eliminarPais = async (req, res, next) => {
    try {
        const { id } = req.params;
        const paisEliminado = await paisModel.delete(id);
        res.status(200).json({
            message: 'pais eliminado con éxito',
            data: paisEliminado
        });
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};
