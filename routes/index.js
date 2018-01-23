const express = require('express');
const router = express.Router();
const ctrl = require("../controller/controller");
const jwt = require("jsonwebtoken");
const path = require("path");
const driver = require('node-phantom-simple');

router.get("/getmac", ctrl.getMacAddress);


router.post("/login", function (req, res, next) {
  res.set({
    'Authorization': jwt.sign({
        exp: 10,
        data: {
          name: req.body.username,
          password: req.body.password
        }
      },
      "MY_SECRET"
    )
  })
  res.end('ok')
});

router.get('/checkToken', function (req, res, next) {
  // console.log(req.get('Authorization'))
  try {
    if (!req.get('Authorization')) {
      res.json({
        msg: '访问没有权限'
      });
      return;
    }

    jwt.verify(req.get('Authorization'), 'MY_SECRET', function (err, decoded) {
      // console.log(decoded) // bar
      if (decoded === undefined) {
        res.json({
          "msg": "token 已过期"
        })
      } else {
        res.json({
          "msg": "ok"
        })
      }
    });
  } catch(e) {
    console.log(e)
  }
});

router.post("/upload", function (req, res, next) {
  if (!req.files) return res.status(400).send("No files were uploaded.");

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv("public/uploads/" + sampleFile.name, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

router.get('/captureimg', function (req, res, next) {
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
              console.log(path.resolve(__dirname, '../public/img/'))
              page.render(path.resolve(__dirname, '../public/img') + '/' + getImgName() + '.png')
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
})


router.post('/add_person', function (req, res, text) {
  var name = req.body.name;
  var age = req.body.age;
  if (name && age) {
    res.json({
      msg: 'ok'
    })
  } else {
    res.json({
      msg: 'fail'
    })
  }
})
/**
 * 获取学员
 */
router.get('/get_student', function (req, res, error) {
  res.json({
    name: 'tom',
    age: 123
  })
})

router.get('/update_person', function (req, res, next) {

})


module.exports = router;