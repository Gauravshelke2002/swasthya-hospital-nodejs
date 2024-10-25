var mongoose = require("mongoose");

var obstetricksmainschema = new mongoose.Schema({
    "image":String,
    "title1":String,
    "title2":String,
    "para1":String,
    "para2":String
    
    
    
});

var obstetricksmainModel = mongoose.model("obstetricks_main",obstetricksmainschema);

module.exports = obstetricksmainModel;