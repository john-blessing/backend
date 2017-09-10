const Promise = require('promise');
const pool = require('../config/connectMysql')

module.exports = {
  getAllProducts: function () {
    return new Promise((resovle, reject) => {
      pool.getConnection(function (err, connection) {
        connection.query({ sql: 'select * from product', timeout: 60000 }, function (error, rows, fields) {
          connection.release();
          if (error) reject(error);
          resovle(rows)
        });
      })
    })
  },
  // saveProduct: function(params, _fn){
  //   connection.query('INSERT INTO products(p_pay,p_update,p_name,pid) VALUES('+params.price+', DATE_FORMAT(NOW(),"%Y,%m,%d"), '+params.pname+','+params.pid+')', function(error,rows, fields){
  //       _fn();
  //   });
  //   connection.end();
  // }
};
