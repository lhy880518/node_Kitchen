var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./server/configure');


app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');

config(app);

var server = app.listen(app.get('port'), function(){
  console.log('Server Connection Success');
});
