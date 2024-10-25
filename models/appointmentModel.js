var mongoose = require("mongoose");

var appointmentschema = new mongoose.Schema({
    "first_name":String,
    "last_name":String,
    "email":String,
    "phone":String,
    "subject":String,
    "message":String

    
});

var appointmentModel = mongoose.model("user_appointment",appointmentschema);

module.exports = appointmentModel;