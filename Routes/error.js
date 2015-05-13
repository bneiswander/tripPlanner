var express = require('express');
var routes = express.Router();

// catch 404 and forward to error handler 
routes.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	err.text = "This is not the page you're looking for!";
	next(err);
});
//handle all errors(anything passed into next())
routes.use(function(err, req, res, next){
	res.status(err.status || 500);
	console.log({error: err});
	res.render('err', {
		error: err
	}
	);
});

module.exports = routes;