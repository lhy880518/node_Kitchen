var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
  num:{
    type: Number,
    default: 0
  },
  title:{
    type: String
  },
  author:{
    type: String
  },
  content:{
    type: String
  },
  created:{
    type: Date,
    default:Date.now
  },
  views:{
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('board', BoardSchema);
