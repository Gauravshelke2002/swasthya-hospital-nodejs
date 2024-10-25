var mongoose = require("mongoose");

var homedepdoctorsschema = new mongoose.Schema({
    "image":String,
    "name":String,
    "position":String,
    "education":String
    
});

var homedepdoctorsModel = mongoose.model("homedep_doctors",homedepdoctorsschema);

module.exports = homedepdoctorsModel;