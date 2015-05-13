var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var sassMiddleWare = require("node-sass-middleware");
var swig = require("swig");
var path = require('path');
var async = require('async');

var routes = require('./Routes/index');
var errors = require('./Routes/error');

//express setup 
var app = express();
app.listen(3000);

app.engine('html', swig.renderFile);
app.set('Views', path.join(__dirname, '/Views'));
app.set('view engine', 'html');

//Middleware 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(sassMiddleWare({
	src: __dirname + '/Assets', 
	dest: __dirname + '/Public',
	debug: true
	})
);

app.use(express.static(path.join(__dirname, '/Public')));

//Routes
app.use('/', routes);
app.use('*', errors);

