var mongoose = require("mongoose");

var cashlesspolicyschema = new mongoose.Schema({
    "n1":String,
    "name":String
    
});

var cashlesspolicyModel = mongoose.model("cashless_policy",cashlesspolicyschema);

module.exports = cashlesspolicyModel;