var mongoose = require("mongoose");

var cashlesstpaschema = new mongoose.Schema({
    "n1":String,
    "name":String
    
});

var cashlesstpaModel = mongoose.model("cashless_tpa",cashlesstpaschema);

module.exports = cashlesstpaModel;