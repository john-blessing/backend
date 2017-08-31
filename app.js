const express = require('express');
const path = require('path');
const config = require('./config');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

//TODO 打印日志
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(fileUpload());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const routes = require('./routes');

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3701");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Cookie, Accept, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

app.use('/api', routes);

var server = app.listen(config.port, function() {
    console.log('server has been started!');
    console.log('PORT is ' + config.port);
});
