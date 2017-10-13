var page = require('webpage').create();  

page.onConsoleMessage = function (msg) {  
    // console.log(msg);  
}  

var url = 'http://www.baidu.com';  
var path = 'hello.png';  

var width = 300;  
var height = 300;  
page.viewportSize = {width: width, height: height}; //浏览器大小，宽度根据网页情况自行设置，高度可以随意，因为后面会滚动到底部  
page.open(url, function (status) {  
    if (status != "success") {  
        console.log('FAIL to load the address');  
        phantom.exit();  
    }  
    console.log(page)
    var length;  
    window.setTimeout(function () {  
        length = page.evaluate(function () {  
            //此函数在目标页面执行的，上下文环境非本phantomjs，所以不能用到这个js中其他变量  
           var div = document.querySelector('.s_form_wrapper'); //要截图的div的id  
            var bc = div.getBoundingClientRect();  
            var top = bc.top;  
            var left = bc.left;  
            var width = bc.width;  
            var height = bc.height;  
            window.scrollTo(0, 10000);//滚动到底部  
            return [top, left, width, height];  
        });  
        console.log(length);  
        page.clipRect = { //截图的偏移和宽高  
            top: length[0],  
            left: length[1],  
            width: length[2],  
            height: length[3]  
        };  
    }, 5000);  
  
    window.setTimeout(function () {  
        page.render(path);  
        phantom.exit();  
    }, 5000 + 500);  
});  