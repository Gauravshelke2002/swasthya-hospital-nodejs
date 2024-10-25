var mongoose = require("mongoose");

var facilitiesschema = new mongoose.Schema({
    "icon":String,
    "heading":String,
    "desc":String
});

var facilitiesModel = mongoose.model("facility",facilitiesschema);

module.exports = facilitiesModel;