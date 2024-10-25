var mongoose = require("mongoose");

var userschema = new mongoose.Schema({
    "user_name":String,
    "mobile_number":String,
    "email_id":String,
    "password":String
    
});

var userModel = mongoose.model("user_tbl",userschema);

module.exports = userModel;