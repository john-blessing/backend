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

  pool.end(function (err) {
    // all connections in the pool have ended
    if(err) throw err;
  });

  module.exports = pool;