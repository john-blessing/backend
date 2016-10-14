const Kitten = require('../models/model.js');
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
					resolve(100);
				} else {
					reject(200);
				}
			});
		})
	}
}


