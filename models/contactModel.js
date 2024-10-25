var mongoose = require("mongoose");

var contactschema = new mongoose.Schema({
    "address":String,
    "email":String,
    "phone":String
   

    
});

var contactModel = mongoose.model("contact_detail",contactschema);

module.exports = contactModel;