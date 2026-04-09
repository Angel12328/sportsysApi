import { sql, dbConfig } from '../config/db.js';

export const DeporteModel = {
    async getAll(accion) {
        try {
            // Se usa getConnection si ya hay un pool creado, o se crea uno
            console.log('en model de deportes la accion es: ',accion);
            const pool = await sql.connect(dbConfig);
            //console.log(pool)
            const result = await pool.request()
                .input('Nombre', sql.VarChar(50), null)          
                .input('generoId', sql.Int, null)                
                .input('accion',sql.VarChar(5),accion)
                .input('idDeporte',sql.Int, null)
                .output('jsonResult', sql.NVarChar(sql.MAX)) // Se espera un output del SP con el resultado en formato JSON
                .execute('sp_Deporte'); 

            // La data vive en result.output.jsonResult
            const data = result.output.jsonResult;
            console.log(JSON.parse(data));
            // Como el SP devuelve un string JSON, hay que parsearlo
            return data ? JSON.parse(data) : [];
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
