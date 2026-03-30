export const validatePais = (req, res, next) => {
    const nuevoGenero= req.body;
    if (!nuevoGenero.nombre ) {
        return res.status(400).json({ message: 'Revise que todos los campos obligatorios estén completos' });
    }
    next(); // 
};

export const validateAccionPais= (req, res, next) => {
    const accion = req.body;
    if (!accion.accion ) {
        return res.status(400).json({ message: 'No se realizo mando ninguna accion' });
    }
    next(); 
};


export const validateIdPais= (req, res, next) => {
    const accion = req.body;
    if (!accion.idPais) {
        return res.status(400).json({ message: 'idPais no especificado' });
    }
    next(); 
};



