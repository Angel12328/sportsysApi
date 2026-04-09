import { DivisionModel } from "../models/divisiones.model.js";

export const obtenerDivisiones = async (req, res, next) => {
    try {
        const { accion, deporteId } = req.query; // Extrae ?accion=... y ?idDeporte=... de la URl
        const divisiones = await DivisionModel.getAll({ accion, deporteId}); // Pasa el objeto con la acción y la información al modelo
        if (!divisiones) {
            return res.status(404).json({ message: 'No se encontraron divisiones' });
        }

        res.status(200).json(divisiones);
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }

};
