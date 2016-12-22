const fs = require('fs');
const path = require('path');
const product = require('../models/product.js');

// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');

// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//backdate a jwt 30 seconds
var older_token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: 'foobar',
    foo: 'bar',
    iat: Math.floor(Date.now() / 1000) - 30
}, 'shhhhh');

module.exports = {
    checkLogin: function (req, res) {
        Service.checkLogin({
            name: req.body.name,
            password: req.body.password
        }).then((value) => {
            res.cookie('sid', older_token).json({
                message: value
            })
            res.end('success');
        }, (err) => {
            res.json({
                message: err
            });
        }).catch(function (error) {
            console.log(error);
        })
    },
    getUserInfo: function (req, res) {
        var queryUserInfo = Service.queryUserInfo();
        queryUserInfo.then(function (value) {
            res.json({
                user: value
            })
        })
    },
    saveUser: function (req, res) {
        Service.saveUser({
            name: req.body.name,
            password: req.body.password
        }).then(function (value) {
            res.json({
                status: value,
                message: '注册成功!'
            });
        }, function (reson) {
            res.json({
                status: 'error',
                message: '注册失败!'
            })
        })
    },
    queryProducts: function (req, res) {
        var params = {
            // name: req.parmas.id,
            // payment: req.parmas.pay
        };

        product.getProducts(params, function(data){
            res.json(data);
        });
    }
};
