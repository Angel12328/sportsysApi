import { VarChar } from 'mssql';
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
    },

    async create(generoInfo) {
        try {
            const pool = await sql.connect(dbConfig);
            // Asumiendo que DB tiene Id autoincremental
            const result = await pool.request()
                .input('nombre', sql.VarChar, generoInfo.nombre)
                .input('accion',VarChar(5),generoInfo.accion)
                // Se retorna el registro insertado para MS SQL Server
                .excecute('sp_Genero');
            return result.recordset[0];
        } catch (error) {
            console.error('Error en DeporteModel.create:', error);
            throw new Error('Error al guardar el deporte en la base de datos');
        }
    },


    async update(idGenero, generoInfo) {
        try {
            const pool = await sql.connect(dbConfig);
            await pool.request()
                .input('idGenero', sql.Int, idGenero)
                .input('nombre', sql.VarChar(5), generoInfo.nombre)                
                .execute("sp_Genero"); // 
            return { message: 'Genero actualizado con éxito' };
        } catch (error) {
            return error.message;
        }
    },

    async delete(id) {
        try {
            const pool = await sql.connect(dbConfig);
            await pool.request()
                .input('id', sql.Int, id)
                .execute("sp_Genero"); // 
            return { message: 'Genero eliminado con éxito' };
        } catch (error) {
            return error.message;
        }
    }    

};