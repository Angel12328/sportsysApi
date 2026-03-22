import { sql, dbConfig } from '../config/db.js';

export const DeporteModel = {
    async getAll() {
        try {
            // Se usa getConnection si ya hay un pool creado, o se crea uno
            const pool = await sql.connect(dbConfig);
            // IMPORTANTE: Asegúrate de tener la tabla 'Deportes' creada en la BD
            const result = await pool.request().query('SELECT * FROM Deportes');

            // Si la tabla no existe o está vacía y quieres enviar un mock temporal, 
            // puedes descomentar esto:
            /*
            if (result.recordset.length === 0) {
                return [
                    { id: 1, nombre: 'Fútbol' },
                    { id: 2, nombre: 'Baloncesto' },
                    { id: 3, nombre: 'Béisbol' }
                ];
            }
            */

            return result.recordset;
        } catch (error) {
            console.error('Error en DeporteModel.getAll:', error);
            throw new Error('Error al obtener los deportes de la base de datos');
        }
    },

    async create(deporteInfo) {
        try {
            const pool = await sql.connect(dbConfig);
            // Asumiendo que DB tiene Id autoincremental
            const result = await pool.request()
                .input('nombre', sql.VarChar, deporteInfo.nombre)
                // Se retorna el registro insertado para MS SQL Server
                .query('INSERT INTO Deportes (nombre) OUTPUT inserted.* VALUES (@nombre)');

            return result.recordset[0];
        } catch (error) {
            console.error('Error en DeporteModel.create:', error);
            throw new Error('Error al guardar el deporte en la base de datos');
        }
    }
};
