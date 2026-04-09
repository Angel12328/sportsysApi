export const validateLigas= (req, res, next) => {
    const { accion } = req.query; // Extrae ?accion=... de la URL
    console.log('en el validate de ligas la accion es', accion);

    if (!accion) {
        return res.status(400).json({ message: 'No se realizo mando ninguna accion' });
    }
    next(); 
};