var mongoose = require("mongoose");

var homedeppart1schema = new mongoose.Schema({
    "image":String,
    "title":String
    
});

var homedeppart1Model = mongoose.model("homedeppart1",homedeppart1schema);

module.exports = homedeppart1Model;