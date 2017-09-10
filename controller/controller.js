const fs = require('fs');
const path = require('path');
const pool = require('../config/connect-mysql')

exports.queryAllProducts = function (req, res) {
    pool.getConnection(function (err, conn) {
        if(err) throw err;

        conn.query({ sql: 'select * from product', timeout: 60000 }, function (error, rows, fields) {
            if (error) throw error;
            res.json({'res_code': 200, 'msg': rows})
            conn.release();                        
        });
    })
};
