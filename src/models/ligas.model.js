import { sql, dbConfig } from '../config/db.js';
export const LigaModel = {
    async getAll(info) {
        try {
            // Se usa getConnection si ya hay un pool creado, o se crea uno
            const pool = await sql.connect(dbConfig);
            // IMPORTANTE: Asegúrate de tener la tabla 'Deportes' creada en la BD
            const result = await pool.request()
                .input('idLiga', sql.Int, info.idLiga || null)
                .input('busqueda', sql.VarChar(100), info.busqueda || null)
                .input('nombre', sql.VarChar(45), info.nombre || null)
                .input('foto_perfil', sql.VarChar(255), info.foto_perfil || null)
                .input('paisId', sql.Int, info.paisId || null)
                .input('divisionId', sql.Int, info.divisionId || null)
                .input('deporteId', sql.Int, info.deporteId || null)
                .input('formatoId', sql.Int, info.formatoId || null)
                .input('accion', sql.VarChar(5), info.accion)
                .input('pagina', sql.Int, info.pagina || 1)
                .input('TamanioPagina', sql.Int, info.TamanioPagina || 10)
                .output('jsonResult', sql.NVarChar(sql.MAX)) // Se espera un output del SP con el resultado en formato JSON
                .execute('sp_Liga');

            // La data vive en result.output.jsonResult
            const data = result.output.jsonResult;
            console.log(JSON.parse(data));
            // Como el SP devuelve un string JSON, hay que parsearlo
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error en DeporteModel.getAll:', error);
            throw new Error('Error al obtener los paises de la base de datos');
        }
    }

};