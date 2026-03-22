export const validateUsuario = (req, res, next) => {
    const nuevoUsuario = req.body;
    if (!nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.password) {
        return res.status(400).json({ error: 'El nombre, email y password son obligatorios' });
    }
    next();
};
