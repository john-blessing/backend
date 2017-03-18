const fs = require('fs');
const path = require('path');
const product = require('../models/product.js');

exports.queryProducts = function(req, res) {
    var params = {
        // name: req.parmas.id,
        // payment: req.parmas.pay
    };
    res.cookie('id','888')
    product.getProducts(params, function(data) {
        res.json({"statusCode":200, "message": data});
        
    });
};

exports.saveProduct = function(req, res) {
    var params = {
        price: req.body.price,
        pname: req.body.pname,
        pid: req.body.pid
    };

    product.saveProduct(params, function() {
        res.json({ "statusCode": 201, "message": 1 });
    });
};
