const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'nightmartins',
  password: '002503199500',
  database: 'storeManager',
});

module.exports = connection;
