const ctr = require('../controller/controller');
const multer  = require('multer')
const fs = require('fs');
const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

module.exports = {
	RouteUrl:function(app){
		app.get('/userInfo', ctr.getUserInfo);
		app.post('/saveUser', ctr.saveUser);
		app.post('/checkLogin', ctr.checkLogin);
		app.post('/upload', upload.single('userPhoto'), function(req,res,next){
			if(req.file){
				res.json({src: `http://localhost:8999/uploads/${req.file.originalname}`});
			} else {
				res.json({message: '599'})
			}
		});
	}
}
