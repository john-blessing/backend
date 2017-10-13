var http = require('http')

http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    // 发送响应数据 "Hello World"
    response.end('<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="margin:0; padding: 0;">'+
    '<div style="background:#fff;width: 300px;height:400px;border:1px solid red;text-align:center;margin:10px auto"><p><img style="width:50px;height:50px;border-radius:50%;vertical-align:middle;margin-right:10px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507866132196&di=6bb42539f2e735b0152c8bfb01df1f7b&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201408%2F13%2F20140813124206_4tfeM.jpeg"/>    扫码关注哦~ </p>'+
    '<div style="text-align:center;margin-top: 50px;"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507865719416&di=1d90b8c28ccd5450c727852f4a25a972&imgtype=0&src=http%3A%2F%2Fwww.eccn.com%2Fevents%2F2017%2Fosram%2Fimages%2Fweixin.gif"/></div>'+
    '</div>'+
    '</body></html>');
}).listen(8888);                        