var mongoose = require("mongoose");

var cashlessfacilityschema = new mongoose.Schema({
    "n1":String,
    "name":String
    
});

var cashlessfacilityModel = mongoose.model("cashless_facility",cashlessfacilityschema);

module.exports = cashlessfacilityModel;