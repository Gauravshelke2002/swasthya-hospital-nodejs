var mongoose = require("mongoose");

var cardiologypart2schema = new mongoose.Schema({
    "image":String,

    "name":String,
    "no":String
   

    
});

var cardiologypart2Model = mongoose.model("cardiology_part2",cardiologypart2schema);

module.exports = cardiologypart2Model;