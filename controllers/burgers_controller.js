/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function (req, res) {
	res.redirect('/burgers')
});

router.get('/burgers', function (req, res) {
	burger.selectAll(function (burger_data) {
		//var hbsObject = { burgers: data };
		//console.log(hbsObject);
		res.render('index', {burger_data});
	});
});

router.post('/burgers/create', function (req, res) {
	burger.insertOne(req.body.burger_name, function (result) {
		console.log(result);
		res.redirect('/');
	});
});

router.put('/burgers/update', function (req, res) {
	burger.updateOne(req.body.burger_id, function (result) {
		console.log(result);
		res.redirect('/');
	});
});

module.exports = router;
