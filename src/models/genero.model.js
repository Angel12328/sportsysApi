//import { VarChar } from 'mssql';
import { sql, dbConfig } from '../config/db.js';

export const generoModel ={
    
    async getAll(accion) {
        try {
            // Se usa getConnection si ya hay un pool creado, o se crea uno
            console.log('en model la accion es: ',accion);
            const pool = await sql.connect(dbConfig);
            //console.log(pool)
            const result = await pool.request()
                .input('idGenero', sql.Int, null)          
                .input('Nombre', sql.VarChar(45), null)                
                .input('accion',sql.VarChar(5),accion)
                .output('jsonResult', sql.NVarChar(sql.MAX)) // Se espera un output del SP con el resultado en formato JSON
                .execute('sp_Genero'); 

            // La data vive en result.output.jsonResult
            const data = result.output.jsonResult;
            //console.log(JSON.parse(data));
            // Como el SP devuelve un string JSON, hay que parsearlo
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error en generoModel.getAll:', error);
            throw new Error('Error al obtener los generos de la base de datos');
        }
    },

    async create(generoInfo) {
        try {
            const pool = await sql.connect(dbConfig);
            // Asumiendo que DB tiene Id autoincremental
            const result = await pool.request()
                .input('nombre', sql.VarChar(5), generoInfo.nombre)
                .input('accion',VarChar(5),generoInfo.accion)
                // Se retorna el registro insertado para MS SQL Server
                .excecute('sp_Genero');
            return result.recordset[0];
        } catch (error) {
            console.error('Error en DeporteModel.create:', error);
            throw new Error('Error al guardar el genero en la base de datos');
        }
    },


    async update(generoInfo) {
        try {
            const pool = await sql.connect(dbConfig);
            await pool.request()
                .input('idGenero', sql.Int, generoInfo.idGenero)
                .input('nombre', sql.VarChar(5), generoInfo.nombre)                
                .execute("sp_Genero"); // 
            return { message: 'Genero actualizado con éxito' };
        } catch (error) {
            return error.message;
        }
    },

    async delete(a) {
        try {
            const pool = await sql.connect(dbConfig);
            await pool.request()
                .input('id', sql.Int, a.id)
                .execute("sp_Genero"); // 
            return { message: 'Genero eliminado con éxito' };
        } catch (error) {
            return error.message;
        }
    }    

};