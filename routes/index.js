var express = require('express');
var router = express.Router();

var database = require('./maker');

var maker = new database();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


/* registration page */
router.get('/staff', function(req, res, next) {
	res.render('staff', { title: '手作家注册' });
});

/* login page */
router.get('/login', function(req, res, next) {
	res.render('login', { title: '手作家登录' });
});


/* login page */
router.post('/maker', function(req, res, next) {


	console.log(req.body);
	if(req.body.action=='login'){
		maker.login(req.body, function(res){
			console.log('login: ' + res);
		});
		var text = {
			data: "login"
		};
		res.send(text);
	}else{

		maker.add(req.body, function(res){
			console.log('register: ' + res);
		});
		var text = {
			data: "register"
		};
		res.send(text);
	}
	//maker.add(req.body);
});


router.get('/ajax/test', function(req, res){
  var text = {
    data: "hello world"
  };
  res.send(text);
});


module.exports = router;
