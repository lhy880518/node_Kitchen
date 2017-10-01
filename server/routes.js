var express = require('express');
var router = express.Router();
var home = require('../controllers/home');
var path = require('path');
var models = require('../models');

module.exports = function(app){
  router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public/views/layouts/')+'main.html');
  });

  router.get('/mongodb_detail', function(req, res){
    res.send('test');
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
    boardModel.save(function(err){
      if(err) res.send(err);
      res.send();
    });
  });

  router.get('/board_mod/:_id', function(req, res){
    var _id  = req.params._id;
    models.board.findOne({_id : _id},function(err, board){
      if(err) res.send(err);
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
