//사용할 모듈 선언
var path = require('path');
var exphbs = require('express-handlebars');
var express = require('express');
var bodyParser = require('body-parser'); // HTML 양식을 통해 제출된 양식 데이터의 해석을 도와줌
var cookieParser = require('cookie-parser'); // 쿠키를 보내고 받을 수 있게 해준다
var morgan = require('morgan'); // 로깅담당 모듈, 노드 서버 디버깅용
var methodOverride = require('method-override');
var errorHandler = require('errorhandler'); // 에러 핸들러
var moment = require('moment');
var routes = require('./routes');

module.exports = function(app){
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(methodOverride());
  app.use('/public/', express.static(path.join(__dirname, '../public')));

  if('development' === app.get('env')){
    app.use(errorHandler());
  }
  app.engine(
    'handlebars', exphbs.create({
      defaultLayout: 'main',//디폴트 레이아웃명.handlebars 가 호출되도록 설정
      //layoutsDir : The string name or path of a template in the layoutsDir to use as the default layout
      //디폴트 레이아웃의 위치 설정
      layoutsDir: app.get('views') + '/layouts',// server.js에서 app.set('views')를 설정 해 둠
      partialsDir: [app.get('views') + '/partials'],
      helpers:{
        timeago: function(timestamp){
          return moment(timestamp).startOf('minute').fromNow();
        }
      }
    }).engine);

    app.set('view engine', 'handlebars');


  routes(app);
};
