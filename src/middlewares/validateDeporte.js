export const validateDeporte = (req, res, next) => {
    const nuevoDeporte = req.body;
    if (!nuevoDeporte.nombre) {
        return res.status(400).json({ error: 'El nombre del deporte es obligatorio' });
    }
    next();
};
