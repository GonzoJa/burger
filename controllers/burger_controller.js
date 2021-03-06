var express = require('express');
var router = express.Router();

var burger = require('../models/burger.js');

//Get route -->Index/home
router.get('/',function(req,res){
	res.redirect('/burgers');
});

router.get('/burgers',function(req,res){
	burger.all(function(burger_data){
		res.render('index',{burger_data});
	});
});

router.post('/burgers/create',function(req,res){
	burger.create(req.body.burger_name,function(result){
		console.log(result);
		res.redirect('/');
	});
});

router.put('/burgers/update',function(req,res){

	burger.update(req.body.burger_id,function(result){
		console.log(result);
		res.redirect('/');
	});
});

module.exports = router;
// Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   burger.selectAll(function(data) {
//     var hbsObject = {
//       burger: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

// router.post("/api/burgers", function(req, res) {
//   burger.create([
//     "cheeseburger", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   burger.updateOne({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/burger/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// // Export routes for server.js to use.
// module.exports = router;