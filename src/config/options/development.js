module.exports = {
    db: {
        client: 'mssql',
        connection: {
            database: process.env.APP_DB_NAME,
            user: process.env.APP_DB_USER,
            password: process.env.APP_DB_PASSWORD,
            server: process.env.APP_DB_HOST,
        },
        pool: {
            min: 2,
            max: 10
        },
        acquireConnectionTimeout: 30000
    }
}