var mongoose = require("mongoose");

var homestatschema = new mongoose.Schema({
    "n1":String,
    "title":String
    
});

var homestatModel = mongoose.model("home_stat",homestatschema);

module.exports = homestatModel;