var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./server/configure');
var path = require('path');

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/public/views');
//console.log('path.join='+path.join(__dirname, './public'));
//app.use(express.static(path.join(__dirname, './public')));

config(app);

var server = app.listen(app.get('port'), function(){
  mongoose.connect('mongodb://localhost/leeimgur');
  console.log('Server Connection Success');
});
