const fs = require('fs');
const path = require('path');
const product = require('../models/product.js');

exports.queryAllProducts = function(req, res) {
    product.getAllProducts().then((data) => {
        res.json({"statusCode":200, "message": data});
    }, (reason) => {
        console.error(reason)
    })
};

exports.saveProduct = function(req, res) {
    var params = {
        price: req.body.price,
        pname: req.body.pname,
        pid: req.body.pid
    };

    // product.saveProduct(params, function() {
    //     res.json({ "statusCode": 201, "message": 1 });
    // });
};

/**
 * 通过id删除指定的商品
 */
exports.deleteProductById = function(req, res){
    
}