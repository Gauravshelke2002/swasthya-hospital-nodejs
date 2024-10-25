var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");
var user_route = require("./routes/user_route");
// var admin_route = require("./routes/admin_route");
const adminRoutes = require('./routes/admin_route');
const path = require('path');

var app = express();

app.use(express.static("public/"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(session({
    secret : "A2Z IT HUB xxscs",
    saveUninitialized : true,
    resave : true
}));


// Set the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use("/",user_route);
app.use("/admin",adminRoutes);


// app.listen(3000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});