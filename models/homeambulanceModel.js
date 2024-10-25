var mongoose = require("mongoose");

var homeambulanceschema = new mongoose.Schema({
    "h1":String,
    "h2":String,
    "h3":String,
    "image":String
   
    
});

var homeambulanceModel = mongoose.model("home_ambulance",homeambulanceschema);

module.exports = homeambulanceModel;