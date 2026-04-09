import { LigaModel } from "../models/ligas.model.js";


export const obtenerLigas = async (req, res, next) => {
    try {
        const  {accion,paisId,deporteId,divisionId}  = req.query; // Extrae ?accion=... de la URL
        console.log(`Accion recibida en el controlador: ${accion} y PAIS ${paisId} el deporte ${deporteId} y la division ${divisionId}`);
        const infoLigas = { accion, paisId, deporteId, divisionId };

        const ligas = await LigaModel.getAllFil(infoLigas);
        if (!ligas ) {
            console.log('No se encontraron ligas para la accion:', accion, 'y paisId:', paisId);
            return res.status(404).json({ message: 'No se encontraron ligas' });
        }
        console.log(ligas);
        res.status(200).json(ligas);
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};


export const obtenerLigasDefault = async (req, res, next) => {
    try {
        const  {accion}  = req.query; // Extrae ?accion=... de la URL
        console.log(`Accion recibida en el controlador: ${accion}`);

        const ligas = await LigaModel.getAll(accion);
        if (!ligas) {
            console.log('No se encontraron ligas para la accion:', accion);
            return res.status(404).json({ message: 'No se encontraron ligas' });
        }
        res.status(200).json(ligas);
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};