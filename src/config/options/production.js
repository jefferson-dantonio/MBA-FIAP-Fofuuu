module.exports = {
    db: {
        client: 'mssql',
        connection: {
            database: process.env.APP_DB_NAME,
            encrypt: true,
            password: process.env.APP_DB_PASSWORD,
            server: process.env.APP_DB_HOST,
            user: process.env.APP_DB_USER,
            requestTimeout: 100000
        },
        pool: {
            min: 2,
            max: 10
        }
    }
}