var driver = require('node-phantom-simple');
var url = 'http://localhost:8888'

function getImgName() {
    var d = new Date()
    return d.getFullYear() + '' + d.getMonth() + '' + d.getDay() + '' + d.getHours() + '' + d.getSeconds() + '' + d.getMilliseconds()
}

driver.create({
    path: require('phantomjs').path
}, (err, browser) => {

    return browser.createPage((err, page) => {

        page.onConsoleMessage = (msg) => {
            console.log(msg);
        }

        page.set('viewportSize', {
            width: 600,
            height: 600
        })
        page.open(url, (err, status) => {
            console.log("opened site ? ", status);

            setTimeout(() => {
                page.evaluate(function () {
                    var div = document.querySelector('div'); //要截图的div的id  
                    var bc = div.getBoundingClientRect();
                    var top = bc.top;
                    var left = bc.left;
                    var width = bc.width;
                    var height = bc.height;
                    return [top, left, width, height];
                }, function (error, result) {
                    if (result) {
                        page.set('clipRect', {
                            top: result[0],
                            left: result[1],
                            width: result[2],
                            height: result[3]
                        })

                        page.render('../img/' + getImgName() + '.png')
                        res.end('ok')                        
                        setTimeout(function () {
                            browser.exit()
                        }, 1000)
                    } else {
                        throw new Error(result)
                    }
                });
            }, 1000);
        });
    });
});