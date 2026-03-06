const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool(process.env.DB_CONNECTION);


module.exports = pool;