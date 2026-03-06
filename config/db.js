const mysql = require('mysql2/promise');

console.log("DB_CONNECTION:", process.env.DB_CONNECTION);
const pool = mysql.createPool(process.env.DB_CONNECTION);



module.exports = pool;
