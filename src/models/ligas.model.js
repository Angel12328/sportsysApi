import { sql, dbConfig } from '../config/db.js';
export const LigaModel = {
    async getAll(accion) {
        try {
            // Se usa getConnection si ya hay un pool creado, o se crea uno
            const pool = await sql.connect(dbConfig);
            // IMPORTANTE: Asegúrate de tener la tabla 'Deportes' creada en la BD
            const result = await pool.request()
                .input('idLiga', sql.Int, null)
                .input('Nombre', sql.VarChar(45), null)
                .input('foto_perfil', sql.VarChar(255), null)
                .input('paisId', sql.Int, null)
                .input('divisionId', sql.Int, null)
                .input('deporteId', sql.Int, null)
                .input('formatoId', sql.Int, null)
                .input('accion', sql.VarChar(5), accion)
                .output('jsonResult', sql.NVarChar(sql.MAX)) // Se espera un output del SP con el resultado en formato JSON
                .execute('sp_Liga');

            // La data vive en result.output.jsonResult
            const data = result.output.jsonResult;
            console.log(JSON.parse(data));
            // Como el SP devuelve un string JSON, hay que parsearlo
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error en DeporteModel.getAll:', error);
            throw new Error('Error al obtener los las ligas default de la base de datos');
        }
    },

    async getAllFil(info) {
        try {
            // Se usa getConnection si ya hay un pool creado, o se crea uno
            const pool = await sql.connect(dbConfig);
            // IMPORTANTE: Asegúrate de tener la tabla 'Deportes' creada en la BD
            const result = await pool.request()
                .input('idLiga', sql.Int, null)
                .input('Nombre', sql.VarChar(45), null)
                .input('foto_perfil', sql.VarChar(255), null)
                .input('paisId', sql.Int, info.paisId || null)
                .input('divisionId', sql.Int, info.divisionId || null)
                .input('deporteId', sql.Int, info.deporteId || null)
                .input('formatoId', sql.Int,null)
                .input('accion', sql.VarChar(5), info.accion)
                .output('jsonResult', sql.NVarChar(sql.MAX)) // Se espera un output del SP con el resultado en formato JSON
                .execute('sp_Liga');

            // La data vive en result.output.jsonResult
            const data = result.output.jsonResult;
            console.log(JSON.parse(data));
            // Como el SP devuelve un string JSON, hay que parsearlo
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error en DeporteModel.getAll:', error);
            throw new Error('Error al obtener los las ligas default de la base de datos');
        }
    }

};