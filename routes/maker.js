var express = require('express');

function Maker(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	});

	connection.query('use hkproduce');

	console.log("------------hello---------------");

	this.add = function(maker){


		var sql = "insert into maker (maker_name, mobile, email, password, brand_name) values (\'" +
			maker.maker_name + "\', \'" + maker.mobile + "\', \'" + maker.email + "\', \'" + maker.password +
			"\', \'" + maker.brand_name + "\')";
		
		connection.query(sql, function(err, res){
		  console.log(res);
		  console.log('err:'+err);
		});
	}

	this.login = function(maker, callback){

		var sql = "select * from maker where mobile = \'"+ maker.mobile + "\'";
		var ret;

		connection.query(sql, function(err, res){

			if(!res){
				ret = {err:'手机号不存在', data:""};
				callback(ret);
			}else{
			  	if(res[0].mobile == maker.mobile){
			  		ret = {err:"登陆成功", data: res[0].maker_id};
			  		callback(ret);
			  	}else{
			  		ret = {err:"密码错误", data: ""};
			  		callback(ret);
			  	}
			}

		});

	}


	this.get = function(maker, callback){

		var sql = "insert into maker (maker_name, mobile, email, password, brand_name) values (\'" +
			maker.maker_name + "\', \'" + maker.mobile + "\', \'" + maker.email + "\', \'" + maker.password +
			"\', \'" + maker.brand_name + "\')";
		
		connection.query(sql, function(err, res){
		  	console.log(res);
		  	if(!err){
		  		callback(1);
		  	}else{
		  		callback(0);
		  	}
		});
	}
}

module.exports = Maker;
