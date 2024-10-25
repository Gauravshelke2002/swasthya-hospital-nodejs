var mongoose = require("mongoose");

var cardiologymainschema = new mongoose.Schema({
    "image":String,
    "title1":String,
    "title2":String,
    "para1":String,
    "para2":String,
    "para3":String,
    "para4":String
    
    
});

var cardiologymainModel = mongoose.model("cardiology_main",cardiologymainschema);

module.exports = cardiologymainModel;