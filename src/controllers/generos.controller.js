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

