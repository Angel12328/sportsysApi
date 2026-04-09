export const validateDeporte = (req, res, next) => {
    const nuevoDeporte = req.body;
    if (!nuevoDeporte.nombre) {
        return res.status(400).json({ error: 'El nombre del deporte es obligatorio' });
    }
    next();
};

export const validateAccionDeporte = (req, res, next) => {
    console.log('en el validate de depportes la accion es',req.query);
    const { accion } = req.query; // Extrae ?accion=... de la URL
    console.log(accion);
    if (!accion) {
        return res.status(400).json({ message: 'No se realizo mando ninguna accion' });
    }
    console.log('paso la validacion de accion en deportes, accion es:', accion);
    next(); 
};
