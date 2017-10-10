var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./server/configure');
var path = require('path');

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/public/views');

config(app);

var server = app.listen(app.get('port'), function(){
  //포트 3300으로 서버가 구동되면 MongoDB를 연동 시킵니다.
  mongoose.connect('mongodb://localhost/lee_board');
  console.log('Server Connection Success');
});
