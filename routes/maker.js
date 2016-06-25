var express = require('express');

var moment = require('moment');

function Maker(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	});

	connection.query('use hkproduce');

	console.log("------------hello---------------");

	this.add = function(maker, callback){


		var ret;

		var sql = "insert into maker (maker_name, mobile, email, password, brand_name) values (\'" +
			maker.maker_name + "\', \'" + maker.mobile + "\', \'" + maker.email + "\', \'" + maker.password +
			"\', \'" + maker.brand_name + "\')";
		
		connection.query(sql, function(err, res){
			if(!res){
				ret = {err:"注册成功", data:""};
				callback(ret);
			}else{
				ret = {err:"", data:""};
				callback(ret);
			}
		});
	}

	this.login = function(maker, callback){

		var sql = "select * from maker where mobile = \'"+ maker.mobile + "\'";
		var ret;

		connection.query(sql, function(err, res){


			if(!res[0]){
				ret = {err:"手机号不存在", data:""};
				callback(ret);
			}else{
			  	if(res[0].password == maker.password){
			  		ret = {err:"", data: res[0].maker_id};
			  		callback(ret);
			  	}else{
			  		ret = {err:"密码错误", data: ""};
			  		callback(ret);
			  	}
			}

		});
	}


	this.getMaker = function(maker_id, callback){

		var sql = "select * from maker where maker_id = \'" + maker_id + "\'";		
		connection.query(sql, function(err, res){
		  	callback(res);
		});
	}

	this.getCounterList = function(maker, callback){
		var sql = "select * from counter where true";

		connection.query(sql, function(err, res){
		  	callback(res);
		});

	}


	this.setWeekRev = function(maker, callback) {
		var sql = "insert into revenue (week_id, revenue, maker_id) values (" + maker.week_id + ", " + 
			maker.revenue + ", " + maker.maker_id + ")";

		connection.query(sql, function(err, res){
		  	callback(res);
		});
	}


	this.getWeek = function(date, callback){
		var sql = "select * from week where start_date<\'" + date + "\' and end_date>=\'" + date +"\'";
		connection.query(sql, function(err, res){
			callback(res);
		});
	}

	this.getRevenue = function(maker_id, callback){
		console.log("maker_id: " + maker_id)
		var sql = "select * from revenue join week on revenue.week_id = week.week_id where maker_id = \'" + maker_id + "\' order by revenue_id desc";
		connection.query(sql, function(err, res){
			callback(res);
		});
	}


	this.setCounter = function(maker_id, callback){
		var counters = new Array(
			"A2a", "A3a", "A4a", "A5a", "A6a", "A7a", "A8a", "A9a", "A10a", "A11a", "A12a", "A13a", "A14a", "A15a", 
			"A1b", "A2b", "A3b", "A4b", "A5b", "A6b", "A7b", "A8b", "A9b", "A10b", "A11b", "A12b", "A13b", "A14b", "A15b", 
			"A1c", "A2c", "A3c", "A4c", "A5c", "A6c", "A7c", "A8c", "A9c", "A10c", "A11c", "A12c", "A13c", "A14c", "A15c",
			"A1d", "A2d", "A3d", "A4d", "A5d", "A6d", "A7d", "A8d", "A9d", "A10d", "A11d", "A12d", "A13d", "A14d", "A15d",
			"A1e", "A2e", "A3e", "A4e", "A5e", "A6e", "A7e", "A8e", "A9e", "A10e", "A11e", "A12e", "A13e", "A14e", "A15e",
			"A1f", "A2f", "A3f", "A4f", "A5f", "A6f", "A7f", "A8f", "A9f", "A10f", "A11f", "A12f", "A13f", "A14f", "A15f",

			"B1a", "B2a", "B3a", "B4a", "B5a", "B6a", "B7a", "B8a", "B9a", "B10a", "B11a", "B12a",
			"B1b", "B2b", "B3b", "B4b", "B5b", "B6b", "B7b", "B8b", "B9b", "B10b", "B11b", "B12b",
			"B1c", "B2c", "B3c", "B4c", "B5c", "B6c", "B7c", "B8c", "B9c", "B10c", "B11c", "B12c",
			"B1d", "B2d", "B3d", "B4d", "B5d", "B6d", "B7d", "B8d", "B9d", "B10d", "B11d", "B12d",
			"B1e", "B2e", "B3e", "B4e", "B5e", "B6e", "B7e", "B8e", "B9e", "B10e", "B11e", "B12e",
			"B1f", "B2f", "B3f", "B4f", "B5f", "B6f", "B7f", "B8f", "B9f", "B10f", "B11f", "B12f",

			"C1a", "C2a", "C3a", "C4a", "C5a", "C6a", "C7a", "C8a", "C9a", "C10a", "C11a", "C12a", "C13a", "C14a", "C15a", 
			"C1b", "C2b", "C3b", "C4b", "C5b", "C6b", "C7b", "C8b", "C9b", "C10b", "C11b", "C12b", "C13b", "C14b", "C15b", 
			"C1c", "C2c", "C3c", "C4c", "C5c", "C6c", "C7c", "C8c", "C9c", "C10c", "C11c", "C12c", "C13c", "C14c", "C15c",
			"C1d", "C2d", "C3d", "C4d", "C5d", "C6d", "C7d", "C8d", "C9d", "C10d", "C11d", "C12d", "C13d", "C14d", "C15d",
			"C1e", "C2e", "C3e", "C4e", "C5e", "C6e", "C7e", "C8e", "C9e", "C10e", "C11e", "C12e", "C13e", "C14e", "C15e",
			"C1f", "C2f", "C3f", "C4f", "C5f", "C6f", "C7f", "C8f", "C9f", "C10f", "C11f", "C12f", "C13f", "C14f", "C15f",

			"D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12",
			"D13", "D14", "D15", "D16", "D17", "D18", "D19", "D20", "D21", "D22", "D23", "D24",

			"E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12",
			"E13", "E14", "E15", "E16", "E17", "E18", "E19", "E20"

			);
		var length = counters.length;

		for(var i=0; i<length; i++){
			console.log(counters[i]);
			var sql = "insert into counter(name) values (\'" + counters[i] + "\')"; 
			connection.query(sql, function(err, res){
			});
		}
		callback("hello");
	}

	this.setCode = function(counter_id){
		var crypto = require('crypto');
		var date = new Date();
		var content = 'password'+date+counter_id;
		var md5 = crypto.createHash('md5');
		md5.update(content);
		var d = md5.digest('hex');  //MD5值是5f4dcc3b5aa765d61d8327deb882cf99

		var sql = "update counter set code = \'" + d.substring(0,12) + "\' where counter_id=" + counter_id + "";
		connection.query(sql, function(err, res){
			console.log(err);
		});

		console.log(sql);
	}


	this.testCode = function(){
		for(var i=1; i<297; i++){
			this.setCode(i);
		}
	}



	this.updateWeek = function(callback){
		var sql = "select * from week order by week_id desc limit 1";

		connection.query(sql, function(err, res){

		  	var date = moment(res[0].end_date).format('YYYY-MM-DD HH:mm:ss');
		  	var end_date = new Date(res[0].end_date);

		  	var cur_date = new Date();
		  	var new_date = new Date();
		  	new_date.setTime(end_date.getTime()+7*24*3600*1000);

		  	end_date = moment(end_date).format('YYYY-MM-DD HH:mm:ss');
		  	new_date = moment(new_date).format('YYYY-MM-DD HH:mm:ss');

		  	console.log("end: " + end_date);
		  	console.log("new: " + new_date);

		  	var sql = "insert into week (start_date, end_date) values (\'" + end_date +
		  		"\', \'" + new_date + "\')";
			connection.query(sql, function(err, res){
				console.log(err);
			});

		});
	}
}

module.exports = Maker;
