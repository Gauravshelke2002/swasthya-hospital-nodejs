var mongoose = require("mongoose");

var cashlessgovnschema = new mongoose.Schema({
    "n1":String,
    "name":String
    
});

var cashlessgovnModel = mongoose.model("cashless_govn",cashlessgovnschema);

module.exports = cashlessgovnModel;