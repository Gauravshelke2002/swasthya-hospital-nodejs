var mongoose = require("mongoose");

var obstetrickspart3schema = new mongoose.Schema({
    "icon":String,
    "name":String
    
    
    
});

var obstetrickspart3Model = mongoose.model("obstetricks_part3",obstetrickspart3schema);

module.exports = obstetrickspart3Model;