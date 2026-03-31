export const validateGenero = (req, res, next) => {
    const nuevoGenero= req.body;
    if (!nuevoGenero.nombre ) {
        return res.status(400).json({ message: 'Revise que todos los campos obligatorios estén completos' });
    }
    next(); // 
};

export const validateAccionGenero= (req, res, next) => {
    console.log(req.query);
    const { accion } = req.query; // Extrae ?accion=... de la URL
    console.log(accion);
    if (!accion) {
        return res.status(400).json({ message: 'No se realizo mando ninguna accion' });
    }
    next(); 
};


export const validateIdGenero= (req, res, next) => {
    const accion = req.body;
    if (!accion.idGenero) {
        return res.status(400).json({ message: 'idGenero no especificado' });
    }
    next(); 
};







