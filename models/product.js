const mysql = require('mysql');
const Promise = require('promise');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tiger',
  database: 'products'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

module.exports = {
  getProducts: function (params, _fn) {
    connection.query('SELECT * FROM PRODUCTS', function (error, rows, fields) {
        _fn(rows);
    });
    connection.end();
  },
  saveProduct: function(params, _fn){
    connection.query('INSERT INTO products(p_pay,p_update,p_name,pid) VALUES('+params.price+', DATE_FORMAT(NOW(),"%Y,%m,%d"), '+params.pname+','+params.pid+')', function(error,rows, fields){
        _fn();
    });
    connection.end();
  }
};
