export const validateGenero = (req, res, next) => {
    const nuevoGenero= req.body;
    if (!nuevoGenero.nombre ) {
        return res.status(400).json({ message: 'Revise que todos los campos obligatorios estén completos' });
    }
    next(); // 
};








