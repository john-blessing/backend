const express = require('express');
const router = express.Router();
const ctrl = require('../controller/controller');
const jwt = require('jsonwebtoken');

router.get('/products', ctrl.queryProducts);

router.post('/saveProduct', ctrl.saveProduct);

router.post('/login', function(req, res, next) {
    res.cookie('token', jwt.sign({
        name: req.body.username,
        password: req.body.password
    }, "MY_SECRET"))
    res.send('about')
});
module.exports = router;