import { sql, dbConfig } from '../config/db.js';

export const generoModel ={
    
    async getAll() {
        try {
            // Se usa getConnection si ya hay un pool creado, o se crea uno
            const pool = await sql.connect(dbConfig);
            // IMPORTANTE: Asegúrate de tener la tabla 'Deportes' creada en la BD
            const result = await pool.request().query('SELECT * FROM Genero');

            return result.recordset;
        } catch (error) {
            console.error('Error en DeporteModel.getAll:', error);
            throw new Error('Error al obtener los deportes de la base de datos');
        }
    }

};