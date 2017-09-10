const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 20,
    host: '192.168.150.130',
    user: 'root',
    password: 'tiger',
    database: 'mall',
    debug: false
  });

  module.exports = pool;