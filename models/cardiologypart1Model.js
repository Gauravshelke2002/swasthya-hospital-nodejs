var mongoose = require("mongoose");

var cardiologypart1schema = new mongoose.Schema({
    "name1":String,
    "name2":String,


    "icon":String
   

    
});

var cardiologypart1Model = mongoose.model("cardiology_part1",cardiologypart1schema);

module.exports = cardiologypart1Model;