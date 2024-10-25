var mongoose = require("mongoose");

var facilityimgschema = new mongoose.Schema({
    "image":String
   
    
    
});

var facilityimgModel = mongoose.model("facility_img",facilityimgschema);

module.exports = facilityimgModel;