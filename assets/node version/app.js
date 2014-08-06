
/**
 * Module dependencies.
 */

var express = require('express')
  , ejs = require('ejs')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');
  //, mongo = require('mongoose');
  
var app = express();
//var db = mongo.createConnection('mongodb://localhost/newtest');
//var schema = require('models');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/bower_components'));
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render("index", {title : "En todo estás vos"});
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
