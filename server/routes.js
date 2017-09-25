var express = require('express');
var router = express.Router();
var home = require('../controllers/home');

module.exports = function(app){
  app.get('/', home.index);
  app.use(router);
};
