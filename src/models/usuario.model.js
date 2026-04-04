import pkg from 'mssql';
const { MAX } = pkg;

import { sql, dbConfig } from '../config/db.js';

export const UsuarioModel = {
    async getAll() {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .execute("sp_GetAllUsuarios"); // 
            // El JSON resultante estará en result.output.jsonResult
            const userData = result.output.jsonResult;
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            return error.message;
        }
    },

    async getUserId(user) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('id', sql.Int, user.id)
                .execute("sp_GetUsuarioById"); // 
            const userData = result.output.jsonResult;
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            return error.message;
        }
    },

    async create(usuarioInfo) {
        try {
            const telefonosJSON = JSON.stringify(
                Array.isArray(usuarioInfo.telefonos) 
                ? usuarioInfo.telefonos.map(t => ({ numero: t })) // Formato objeto para que coincida con tu WITH en SQL
                : [{ numero: usuarioInfo.telefonos }]
            );           
            const pool = await sql.connect(dbConfig);
            
            await pool.request()
                .input('pNombre', sql.VarChar(45), usuarioInfo.pNombre)
                .input('sNombre', sql.VarChar(45), usuarioInfo.sNombre)
                .input('pApellido', sql.VarChar(45), usuarioInfo.pApellido)
                .input('sApellido', sql.VarChar(45), usuarioInfo.sApellido)
                .input('generoId', sql.Int, usuarioInfo.generoId)
                .input('edad', sql.Int, usuarioInfo.edad)
                .input('dni',sql.VarChar(20),usuarioInfo.dni || null)
                .input('direccion', sql.VarChar(250), usuarioInfo.direccion)
                .input('paisId', sql.Int, usuarioInfo.paisId)
                .input('correo', sql.VarChar(255), usuarioInfo.correo)
                .input('password', sql.VarChar(250), usuarioInfo.password)
                .input('rol', sql.VarChar(45), usuarioInfo.rol)
                .input('fotoPerfil', sql.VarChar(2048), usuarioInfo.fotoPerfil || null)
                .input('cargo', sql.VarChar(45), usuarioInfo.cargo || null)
                .input('equipoId', sql.Int, usuarioInfo.equipoId || null)
                .input('ligaId', sql.Int, usuarioInfo.ligaId || null)
                .input('telefonos', sql.NVarChar(sql.MAX), telefonosJSON || null)
                .execute("sp_InsertUsuario"); 
            return { success: true, message: 'Usuario creado con éxito' };
        } catch (error) {
            console.log(error);
            return error.message;
        }
    },

    async update(id, usuarioInfo) {
        try {
            const pool = await sql.connect(dbConfig);
            await pool.request()
                .input('id', sql.Int, id)
                .input('nombre', sql.VarChar, usuarioInfo.nombre)
                .input('email', sql.VarChar, usuarioInfo.email)
                .input('password', sql.VarChar, usuarioInfo.password) // RECUERDA: Hashear el password antes de enviarlo aquí (ej: bcrypt)
                .execute("sp_UpdateUsuario"); // 
            return { message: 'Usuario actualizado con éxito' };
        } catch (error) {
            return error.message;
        }
    },

    async delete(id) {
        try {
            const pool = await sql.connect(dbConfig);
            await pool.request()
                .input('id', sql.Int, id)
                .execute("sp_DeleteUsuario"); // 
            return { message: 'Usuario eliminado con éxito' };
        } catch (error) {
            return error.message;
        }
    },

    async login(info) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('email', sql.VarChar(255), info.email)
                .output('jsonResult', sql.NVarChar(sql.MAX)) // Se espera un output del SP con el resultado en formato JSON
                .execute("sp_GetUsuario"); // 
            const userData = result.output.jsonResult;
            console.log('userData:',userData);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            return error.message;
        }
    }
};
