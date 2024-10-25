var mongoose = require("mongoose");

var cardiologypart3schema = new mongoose.Schema({
    "icon":String,
    "name":String
    
    
    
});

var cardiologypart3Model = mongoose.model("cardiology_part3",cardiologypart3schema);

module.exports = cardiologypart3Model;