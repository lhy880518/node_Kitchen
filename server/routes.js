var express = require('express');
var router = express.Router();
var path = require('path');
var models = require('../models');
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

//프로미스 객체를 활용한 게시글 넘버링 처리
//프로미스를 활용하기 위해 return new Promise로 프로미스 객체 생성 및 resolve를 활용한 리턴값 넘기기
function getNextSequence(name) {
  return new Promise(function(resolve, reject){
    MongoClient.connect('mongodb://localhost/lee_board', function(err, db) {
      db.collection('counters').findAndModify(
        { "_id": name },
        [],
        { $inc : { "seq": 1 }},
        {new: true},
        function(err, doc){
          if (err){
              console.warn('err.message='+err.message);
              rejected(err.message);
          }else{
              resolve(doc.value.seq);
          }
        }
      );
    });
  });
};

module.exports = function(app){
  router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/views/layouts/')+'main.html');
  });

  router.get('/mongodb_detail', function(req, res){
    res.send('mongodb_detail');
  });

  router.get('/express_detail', function(req, res){
    res.send('express_detail');
  });

  //게시판 첫 화면에서는 글의 목록 및 쓰기 버튼이 존재
  router.get('/board_list', function(req, res){
    models.board.find(function(err, boards){
      if(err) res.send(err);
      res.send(boards);
    });
  });

  router.post('/board/create', function(req, res){
      var boardModel = new models.board(req.body);

      //프로미스 객체를 활용하여.then(function(성공함수){},function(실패함수){}); 두가지 패턴을 이용하여 성공시에만 num을 넣은 글을 등록
      getNextSequence('boardid')
      .then(function(id){
        console.log('id='+id);
        boardModel.num = id;
        boardModel.save(function(err,board){
          if(err) res.send(err);
          res.send();
        });
      },
      function(error){
        console.log('error='+error);
      }
    );
  });

  router.get('/board_mod/:_id', function(req, res){
    var _id  = req.params._id;

    models.board.findOne({_id : _id},function(err, board){
      console.log('models.board.findOne');
      if(err) res.send(err);

      if(board){
        console.log('board.views='+board.views);
        board.views = board.views +1;
        board.save();
      }

      console.log('board='+board);
      res.send(board);
    });
  });

  router.put('/board', function(req, res){
    models.board.update(req.body, function(err){
      if(err) res.send(err);
      res.send();
    });
  });

  app.use(router);
};
