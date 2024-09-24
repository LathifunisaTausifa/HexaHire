const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,       // Your database host
    user: process.env.DB_USER,       // Your database user
    password: process.env.DB_PASSWORD, // Your database password
    database: process.env.DB_NAME,   // Your database name
    
});

module.exports = db;
