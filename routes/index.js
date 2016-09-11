var express = require('express');
var router = express.Router();

var database1 = require('./maker');

var maker = new database1();




/* login page */


router.get('/login', function(req, res, next){
	res.render('login', { title: '管理界面' });
});


router.post('/login', function(req, res, next){

	var name = req.body.manager;
	var password = req.body.password;

	if(password == name+'2016hkproduce'){
		console.log('登錄成功');
		res.render('staff', { title: '管理界面' });
	}else{
		console.log('登錄失敗');
		res.render('login', { title: '管理界面' });
	}

})


router.get('/entrance', function(req, res, next) {
	res.render('entrance', { title: '手作家登录' });
});



// 獲取櫃檯列表
router.post('/counter', function(req, res, next) {

	maker.getCounterList(req.body, function(result){
		res.send(result);
	});
});


// 手作家界面：
router.post('/maker', function(req, res, next) {

	maker.login(req.body, function(result){
		var counter = {counter_id: result.data};
		if(result.err){
			res.render('entrance', {title: '手作家', err: result.err});
		}else{
			maker.getRevenue(counter, function(counter){
				res.render('maker', {title: '手作家', data: counter});
			});
		}
	
	});

});

// 生成新的 櫃檯暗碼
router.post('/code', function(req, res, next){
	console.log(req.body);

	maker.setCode(req.body.counter_id, function(result){
		console.log("res:" + result);
		res.send({'code':result});
	});
})



router.post('/test', function(req, res){
	console.log("enter test");
	maker.configureWeek();
});

// 收益： 輸入每週收益； 獲取收益列表
router.post('/revenue', function(req, res){


	if(req.body.action=='set'){

		maker.getWeek(req.body.date, function(result){

			// 防止选择了错误的时间
			if(!result[0].week_id){
				return 0;
			}

			var para = {
				week_id: result[0].week_id,
				revenue: req.body.revenue,
				counter_id: req.body.counter_id,
				remark: req.body.remark,
				code: req.body.code,
			};

			maker.setWeekRev(para, function(result){
				res.send("hello");
			});

		});
	}else{

		if(req.body.action=='getWeekList'){
			maker.getWeek(req.body.date, function(result){
				// 防止选择了错误的时间
				if(!result[0].week_id){
					return 0;
				}

				maker.getRevenueList(result[0].week_id, function(result){
					res.send(result);
				});
			});

		}else{
			maker.getRevenue(req.body.counter_id, function(result){
				console.log(result);
				res.send(result);
			});
		}
	}


});




module.exports = router;
