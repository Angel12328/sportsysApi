import sql from 'mssql';

// Extraemos las variables de entorno
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// Configuración de SQL Server
const dbConfig = {
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    server: DB_HOST,
    port: parseInt(DB_PORT, 10),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // Importante para Azure o ciertas configuraciones de SQL Server modernas
        trustServerCertificate: true // Para desarrollo local normalmente es necesario
    }
};

// Función para conectar a la Base de Datos
export const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log(`✅ Conectado exitosamente a SQL Server (${DB_NAME} en ${DB_HOST})`);
        return pool;
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos SQL Server:', error.message);
        // Opcional: process.exit(1); si quieres que la app se detenga si no hay base de datos
    }
};

// Exportamos la configuración por si alguna consulta la necesita directamente
export { sql, dbConfig };
