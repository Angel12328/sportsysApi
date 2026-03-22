import { DeporteModel } from '../models/deporte.model.js';

export const obtenerDeportes = async (req, res, next) => {
    try {
        const deportes = await DeporteModel.getAll();
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
