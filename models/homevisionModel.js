var mongoose = require("mongoose");

var homevisionschema = new mongoose.Schema({
    "image":String,
    "title":String,
    "desc":String,
    "h1":String,
    "p1":String,
    "h2":String,
    "p2":String
    
});

var homevisionModel = mongoose.model("home_vision",homevisionschema);

module.exports = homevisionModel;