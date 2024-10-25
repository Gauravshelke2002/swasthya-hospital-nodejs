var mongoose = require("mongoose");

var adminschema = new mongoose.Schema({
    "name":String,
    "mobile":String,
    "email":String,
    "password":String
    
});

var adminModel = mongoose.model("admin_tbl",adminschema);

module.exports = adminModel;