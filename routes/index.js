var express = require('express');
var router = express.Router();

var database1 = require('./maker');

var maker = new database1();


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


/* registration page */
router.get('/staff', function(req, res, next) {
	res.render('staff', { title: '管理界面' });
});

/* login page */
router.get('/login', function(req, res, next) {
	res.render('login', { title: '手作家登录' });
});

router.get('/entrance', function(req, res, next) {
	res.render('entrance', { title: '手作家登录' });
});

router.get('/user/:id', function(req, res, next) {

	console.log(req.params.id);

	maker.getMaker(req.params.id, function(result){
		console.log(result);
		res.render('user', {maker: result[0], title: '手作家'});
	});

});


/* login page */
/*router.post('/maker', function(req, res, next) {


	if(req.body.action=='login'){
		console.log(req.body);
		maker.login(req.body, function(result){
			if(!result.err){
				res.send({success:1});
			}else{
				res.send({success:0});
			}
		});
	}else{
		if(req.body.action =='register'){
			maker.add(req.body, function(result){
				if(!result.err){
					res.send({success:1});
				}else{
					res.send({success:0});
				}
			});

		}else{
			if(req.body.action =='getList'){
				maker.getList(req.body, function(result){
					res.send(result);
				});
			}	
		}
	}
	//maker.add(req.body);
});*/


router.post('/counter', function(req, res, next) {
	console.log(req.body);

	maker.getCounterList(req.body, function(result){
		res.send(result);
	});
});



router.post('/maker', function(req, res, next) {
	console.log(req.body);

	maker.login(req.body, function(result){
		console.log(result);
	});
	res.render('maker', {title: '手作家'});
});



router.post('/test', function(req, res){
	maker.testCode();
});


router.post('/Revenue', function(req, res){

	console.log(req.body);

	if(req.body.action=='set'){

		maker.getWeek(req.body.date, function(result){

			var para = {
				week_id: result[0].week_id,
				revenue: req.body.revenue,
				maker_id: req.body.maker_id,
			};

			maker.setWeekRev(para, function(result){
				console.log("save");
			});

		});
	}else{
		maker.getRevenue(req.body.maker_id, function(result){
			console.log(result);
			res.send(result);
		});
	}


});




module.exports = router;
