import { LigaModel } from "../models/ligas.model";

export const obtenerLigas = async (req, res, next) => {
    try {
        const { accion } = req.query; // Extrae ?accion=... de la URL

        const ligas = await LigaModel.getAll({ accion });
        if (!ligas) {
            return res.status(404).json({ message: 'No se encontraron ligas' });
        }
        res.status(200).json(ligas);
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};