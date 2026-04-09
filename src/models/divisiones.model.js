import { sql, dbConfig } from '../config/db.js';

export const DivisionModel = {
    async getAll(info) {
        try {
            // Se usa getConnection si ya hay un pool creado, o se crea uno
            console.log('en model la accion es: ',info.accion);
            const pool = await sql.connect(dbConfig);
            //console.log(pool)
            const result = await pool.request()
                .input('idDivision', sql.Int, null) 
                .input('Nombre', sql.VarChar(45), null)                       
                .input('idDeporte',sql.Int, info.deporteId)
                .input('accion',sql.VarChar(5), info.accion)
                .output('jsonResult', sql.NVarChar(sql.MAX)) // Se espera un output del SP con el resultado en formato JSON
                .execute('sp_Division'); 

            // La data vive en result.output.jsonResult
            const data = result.output.jsonResult;
            console.log(JSON.parse(data));
            // Como el SP devuelve un string JSON, hay que parsearlo
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error en DivisionModel.getAll:', error);
            throw new Error('Error al obtener las divisiones de la base de datos');
        }
    }
};