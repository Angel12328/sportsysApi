import { DeporteModel } from '../models/deporte.model.js';

export const obtenerDeportes = async (req, res, next) => {
    try {
        const { accion } = req.query; // Extrae ?accion=... de la URL {accion: 'accion'}
        const deportes = await DeporteModel.getAll(accion); // Pasa el objeto con la acción al modelo
        if (!deportes) {
            return res.status(404).json({ message: 'No se encontraron deportes' });
        }
        res.status(200).json(deportes);
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};

export const crearDeporte = async (req, res, next) => {
    try {
        const nuevoDeporte = req.body;
        console.log('Guardando nuevo deporte en BD:', nuevoDeporte);

        const deporteCreado = await DeporteModel.create(nuevoDeporte);

        res.status(201).json({
            message: 'Deporte creado con éxito',
            data: deporteCreado
        });
    } catch (error) {
        next(error); // Pasa el error al errorHandler global
    }
};
