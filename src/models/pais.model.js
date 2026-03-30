import { VarChar } from 'mssql';
import { sql, dbConfig } from '../config/db.js';

export const generoModel ={
    
    async getAll(a) {
        try {
            // Se usa getConnection si ya hay un pool creado, o se crea uno
            const pool = await sql.connect(dbConfig);
            // IMPORTANTE: Asegúrate de tener la tabla 'Deportes' creada en la BD
            const result = await pool.request()
                .input('accion',VarChar(5),a.accion)
                .excecute('sp_Pais');

            return result.recordset;
        } catch (error) {
            console.error('Error en DeporteModel.getAll:', error);
            throw new Error('Error al obtener los paises de la base de datos');
        }
    },

    async create(paisInfo) {
        try {
            const pool = await sql.connect(dbConfig);
            // Asumiendo que DB tiene Id autoincremental
            const result = await pool.request()
                .input('nombre', sql.VarChar, paisInfo.nombre)
                .input('accion',VarChar(5),paisInfo.accion)
                // Se retorna el registro insertado para MS SQL Server
                .excecute('sp_Pais');
            return result.recordset[0];
        } catch (error) {
            console.error('Error en DeporteModel.create:', error);
            throw new Error('Error al guardar el pais en la base de datos');
        }
    },


    async update(paisInfo) {
        try {
            const pool = await sql.connect(dbConfig);
            await pool.request()
                .input('idGenero', sql.Int, paisInfo.idGenero)
                .input('nombre', sql.VarChar(5), paisInfo.nombre)                
                .execute("sp_Pais"); // 
            return { message: 'pais actualizado con éxito' };
        } catch (error) {
            return error.message;
        }
    },

    async delete(id) {
        try {
            const pool = await sql.connect(dbConfig);
            await pool.request()
                .input('id', sql.Int, id)
                .execute("sp_Pais"); // 
            return { message: 'pais eliminado con éxito' };
        } catch (error) {
            return error.message;
        }
    }    

};