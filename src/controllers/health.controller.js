export const checkHealth = (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'La API de Sportsys está viva y funcionando'
    });
};
