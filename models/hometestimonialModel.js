var mongoose = require("mongoose");

var hometestimonialschema = new mongoose.Schema({
    "image":String,
    "heading":String,
    "name":String,
    "position":String
    
    
});

var hometestimonialModel = mongoose.model("home_testimonial",hometestimonialschema);

module.exports = hometestimonialModel;