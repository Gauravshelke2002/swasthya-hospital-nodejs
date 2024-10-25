var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/swasthyahospital").then(()=>{
    console.log("connection established");
}).catch(()=>{
    console.log("Failed to connect");
});