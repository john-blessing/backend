const Service = require('../services/service.js');

module.exports = {
	checkLogin: function(req,res){
		var checkLogin = Service.checkLogin({name: req.body.name, password: req.body.password})
		checkLogin.then(function(value){
			res.json({message: value});
		}, function(err){
			res.json({message: err});
		}).catch(function(error){
			console.log(error);
		})
	},
	getUserInfo: function(req, res){
		var queryUserInfo = Service.queryUserInfo();
		queryUserInfo.then(function(value){
			res.json({user: value})
		})
	},
	saveUser: function(req, res){
		var saveUser = Service.saveUser({name: req.body.name, password: req.body.password});
		saveUser.then(function(value){
			res.json({message: value});
		})
	}
};
