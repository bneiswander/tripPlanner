var express = require('express');
var routes = express.Router();
var models = require('../models');
var async = require('async');

routes.get('/', function(req, res){
	// models.Hotel.find({}, function(err, hotels){
	// 	// do something with hotels
	// 	models.ThingToDo.find({}, function(err, things){
	// 		//do something with things
	// 		models.Restaurant.find({}, function(err, restaurants){
	// 			// do something with restaurants
	// 			res.render('index', {
	// 				hotels: hotels,
	// 				things: things,
	// 				restaurants: restaurants
	// 			}); 
	// 		});
	// 	});
	// });
	async.parallel({
		hotels: function(cb){
			models.Hotel.find().exec(cb);
		},
		things: function(cb){
			models.ThingToDo.find().exec(cb);
		},
		restaurants: function(cb){
			models.Restaurant.find().exec(cb);
		}
	}, function(err, results){
		console.log(results);
		res.render('index', {
			hotels: results.hotels,
			things: results.things,
			restaurants: results.restaurants
		});
	});
});

module.exports = routes;