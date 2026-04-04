export const validateUsuario = (req, res, next) => {
    const nuevoUsuario = req.body;
    const rol = req.query.rol; // Extrae ?rol=... de la URL
    console.log('EL ROL ES:',rol)
    console.log('EL NUEVO USUARIO ES:',nuevoUsuario)
    if (!rol) {
        return res.status(400).json({ message: 'No se mando ningun rol' });
    }
    if (nuevoUsuario.edad < 18) {
        return res.status(400).json({ message: 'Solo se pueden registrar usuarios mayores de edad' });
    }    
    if (!nuevoUsuario.pNombre || !nuevoUsuario.sNombre || !nuevoUsuario.pApellido || !nuevoUsuario.sApellido || !nuevoUsuario.generoId || !nuevoUsuario.paisId || !nuevoUsuario.correo || !nuevoUsuario.password) {
        return res.status(400).json({ message: 'Revise que todos los campos obligatorios estén completos bandera' });
    }
    next(); // 
};


export const validateLogin = (req, res, next) => {
    const nuevoUsuario = req.body;
    if (!nuevoUsuario.email || !nuevoUsuario.password) {
        console.log('Faltan campos en el login:', nuevoUsuario);
        return res.status(400).json({ message: 'Revise que todos los campos obligatorios estén completos' });
    }
    console.log('Campos de login validados correctamente para email:', nuevoUsuario.email);
    next(); // 
};
