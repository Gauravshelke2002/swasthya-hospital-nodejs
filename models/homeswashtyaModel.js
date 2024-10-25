
var mongoose = require("mongoose");

var homeswashtyaschema = new mongoose.Schema({
    "image":String,
    "title":String,
    "heading":String,
    "para1":String,
    "para2":String

});

var homeswashtyaModel = mongoose.model("home_swasthya",homeswashtyaschema);
module.exports = homeswashtyaModel;