export const validateUsuario = (req, res, next) => {
    const nuevoUsuario = req.body;
    if (!nuevoUsuario.pnombre || !nuevoUsuario.snombre || !nuevoUsuario.papellido || !nuevoUsuario.sapellido || !nuevoUsuario.generoId || !nuevoUsuario.paisId || !nuevoUsuario.edad < 18 || !nuevoUsuario.email || !nuevoUsuario.password || !nuevoUsuario.rol) {
        return res.status(400).json({ message: 'Revise que todos los campos obligatorios estén completos' });
    }
    next(); // 
};


export const validateLogin = (req, res, next) => {
    const nuevoUsuario = req.body;
    if (!nuevoUsuario.email || !nuevoUsuario.password) {
        return res.status(400).json({ message: 'Revise que todos los campos obligatorios estén completos' });
    }
    next(); // 
};
