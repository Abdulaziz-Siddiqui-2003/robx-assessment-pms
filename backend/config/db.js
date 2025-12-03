const mysql = require('mysql2');

require('dotenv').config();



// Create a connection pool to manage multiple connections efficiently

const pool = mysql.createPool({

  host: process.env.DB_HOST,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0

});



// Test the connection immediately when the app starts

pool.getConnection((err, connection) => {

  if (err) {

    console.error('❌ Database Connection Failed:', err.message);

  } else {

    console.log('✅ Connected to MySQL Database successfully!');

    connection.release(); // Release connection back to pool

  }

});



// Export promise-based pool for async/await usage

module.exports = pool.promise();