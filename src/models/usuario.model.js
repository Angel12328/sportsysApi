import { sql, dbConfig } from '../config/db.js';

export const UsuarioModel = {
    async getAll() {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .execute("sp_GetAllUsuarios"); // 
            return result.recordset;
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
            return result.recordset[0];
        } catch (error) {
            return error.message;
        }
    },

    async create(usuarioInfo) {
        try {
            const pool = await sql.connect(dbConfig);
            
            await pool.request()
                .input('nombre', sql.VarChar(45), usuarioInfo.pnombre)
                .input('snombre', sql.VarChar(45), usuarioInfo.snombre)
                .input('apellido', sql.VarChar(45), usuarioInfo.papellido)
                .input('sapellido', sql.VarChar(45), usuarioInfo.sapellido)
                .input('dni',sql.VarChar(13),usuarioInfo.dni)
                .input('email', sql.VarChar(255), usuarioInfo.email)
                .input('password', sql.VarChar(250), usuarioInfo.password)
                .input('rol', sql.VarChar(45), usuarioInfo.rol)
                .input('fotoPerfil', sql.VarChar(2048), usuarioInfo.fotoPerfil)
                .input('cargo', sql.VarChar(45), usuarioInfo.cargo)
                .input('equipoId', sql.Int, usuarioInfo.equipoId)
                .input('ligaId', sql.Int, usuarioInfo.ligaId)
                .input('telefonos', sql.VarChar(2048), usuarioInfo.telefonos)
                .execute("sp_InsertUsuario"); 
            return { message: 'Usuario creado con éxito'};
        } catch (error) {
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

    async login(email, password) {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('email', sql.VarChar, email)
                .input('password', sql.VarChar, password)
                .execute("sp_GetUsuario"); // 
            return result.recordset[0];
        } catch (error) {
            return error.message;
        }
    }
};
