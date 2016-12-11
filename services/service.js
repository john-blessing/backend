const Kitten = require('../models/user.js');
const Promise = require('promise');

module.exports = {
	queryUserInfo: function(){
		return Promise.resolve(Kitten.find())
	},
	saveUser: function(data){
		var kitten = new Kitten(data)
		return Promise.resolve(kitten.save());
	},
	checkLogin: function(data){
		return new Promise(function(resolve, reject){
			Kitten.find(data, function(error, value){
				if(error) reject(new Error('request timeout'));

				if(value.length > 0){
					resolve('用户登陆成功！');
				} else {
					reject('用户尚未注册！请先注册');
				}
			});
		})
	}
}
