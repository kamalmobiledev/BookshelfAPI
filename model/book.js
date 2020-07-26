var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var book = new Schema({
    id:String,
    title: String,
    category:String,
    authorId: String,
});

module.exports = mongoose.model('Books', book);