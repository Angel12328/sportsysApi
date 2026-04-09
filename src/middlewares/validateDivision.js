export const validateAccionDivision= (req, res, next) => {
    console.log(req.query);
    const { accion, deporteId } = req.query; // Extrae ?accion=... de la URL
    console.log(accion);
    if (!accion) {
        return res.status(400).json({ message: 'No se realizo mando ninguna accion' });
    }
    if (deporteId===0 || !deporteId) {
        return res.status(400).json({ message: 'No se proporcionó el ID del deporte, no se ejecutara la traida de divisiones' });
    }

    next(); 
};