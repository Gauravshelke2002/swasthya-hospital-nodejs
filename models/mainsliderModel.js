var mongoose = require("mongoose");

var mainsliderschema = new mongoose.Schema({
   "slider_image":String
});

var mainsliderModel = mongoose.model("main_slider",mainsliderschema);

module.exports = mainsliderModel;