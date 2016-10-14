const express = require('express');
const path = require('path');

//TODO 打印日志
const logger = require('morgan');

const bodyParser = require('body-parser');

const route = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

route.RouteUrl(app);

let server = app.listen(8999,function(){
    console.log('server has been started!');
});