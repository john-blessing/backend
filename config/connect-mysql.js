const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 20,
    host: '192.168.150.130',
    user: 'root',
    password: 'tiger',
    database: 'mall',
    debug: false
  });

  pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
  });

  module.exports = pool;
  