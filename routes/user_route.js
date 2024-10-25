var express = require("express");
require("./../connection");

var mainsliderModel = require("../models/mainsliderModel");
var facilitiesModel = require("../models/facilitiesModel");
var homeswashtyaModel = require("../models/homeswashtyaModel");
var homedeppart1Model = require("../models/homedeppart1Model");
var homedepdoctorsModel = require("../models/homedepdoctorsModel");
var homeambulanceModel = require("../models/homeambulanceModel");
var homestatModel = require("../models/homestatModel");
var homevisionModel = require("../models/homevisionModel");
var hometestimonialModel = require("../models/hometestimonialModel");
var cardiologymainModel = require("../models/cardiologymainModel");
var cardiologypart1Model = require("../models/cardiologypart1Model");
var cardiologypart2Model = require("../models/cardiologypart2Model");
var cardiologypart3Model = require("../models/cardiologypart3Model");
var obstetricksmainModel = require("../models/obstetricksmainModel");
var obstetrickspart3Model = require("../models/obstetrickspart3Model");
var facilityimgModel = require("../models/facilityimgModel");
var cashlessfacilityModel = require("../models/cashlessfacilityModel");
var cashlesstpaModel = require("../models/cashlesstpaModel");
var cashlessgovnModel = require("../models/cashlessgovnModel");
var cashlesspolicyModel = require("../models/cashlesspolicyModel");
var appointmentModel = require("../models/appointmentModel");
var contactModel = require("../models/contactModel");

var userModel = require("../models/userModel");

var router = express.Router();

function checklogin(req, res, next) {
  if (req.session._id != undefined) next();
  else
    res.send(
      "<script>alert('Invalid Login');location.href = '/login';</script>"
    );
}

router.get("/", async function (req, res) {
  var main_sliders = await mainsliderModel.find();
  var facilities = await facilitiesModel.find();
  var home_swasthya = await homeswashtyaModel.find();
  var homedep_part1 = await homedeppart1Model.find();
  var homedep_doctors = await homedepdoctorsModel.find();
  var home_ambulance = await homeambulanceModel.find();
  var home_stat = await homestatModel.find();
  var home_vision = await homevisionModel.find();
  var home_testimonial = await hometestimonialModel.find();

  var obj = {
    slider: main_sliders,
    facility: facilities,
    home_swasthya: home_swasthya[0],
    homedep_part1: homedep_part1,
    homedep_doctors: homedep_doctors,
    home_ambulance: home_ambulance[0],
    home_stat: home_stat,
    home_vision: home_vision[0],
    home_testimonial: home_testimonial,
    is_login: req.session._id ? true : false,
  };
  res.render("user/home.ejs", obj);
});
router.get("/cardiology", async function (req, res) {
  var cardiology_main = await cardiologymainModel.find();
  var cardiology_part1 = await cardiologypart1Model.find();
  var cardiology_part2 = await cardiologypart2Model.find();

  var cardiology_part3 = await cardiologypart3Model.find();

  var obj = {
    cardiology_main: cardiology_main[0],
    cardiology_part3: cardiology_part3,
    cardiology_part1: cardiology_part1,
    cardiology_part2: cardiology_part2[0],
    is_login: req.session._id ? true : false,
  };

  res.render("user/cardiology.ejs", obj);
});
router.get("/obstetrics", async function (req, res) {
  var obstetricks_main = await obstetricksmainModel.find();
  var cardiology_part1 = await cardiologypart1Model.find();
  var cardiology_part2 = await cardiologypart2Model.find();
  var obstetricks_part3 = await obstetrickspart3Model.find();

  var obj = {
    obstetricks_main: obstetricks_main[0],
    obstetricks_part3: obstetricks_part3,
    cardiology_part1: cardiology_part1,
    cardiology_part2: cardiology_part2[0],
    is_login: req.session._id ? true : false,
  };
  res.render("user/obstetrics.ejs", obj);
});
router.get("/facilities", async function (req, res) {
  var facility_img = await facilityimgModel.find();

  var obj = {
    facility_img: facility_img,
    is_login: req.session._id ? true : false,
  };
  res.render("user/facilities.ejs", obj);
});
router.get("/doctors", async function (req, res) {
  var homedep_doctors = await homedepdoctorsModel.find();

  var obj = {
    homedep_doctors: homedep_doctors,
    is_login: req.session._id ? true : false,
  };

  res.render("user/doctors.ejs", obj);
});
router.get("/cashless", async function (req, res) {
  var cashless_facility = await cashlessfacilityModel.find();
  var cashless_tpa = await cashlesstpaModel.find();
  var cashless_govn = await cashlessgovnModel.find();
  var cashless_policy = await cashlesspolicyModel.find();

  var obj = {
    cashless_facility: cashless_facility,
    cashless_tpa: cashless_tpa,
    cashless_govn: cashless_govn,
    cashless_policy: cashless_policy,
    is_login: req.session._id ? true : false,
  };
  res.render("user/cashless.ejs", obj);
});
router.get("/contact", async function (req, res) {
  var data = await contactModel.find();
  var obj = {
    is_login: req.session._id ? true : false,
    contact: data[0],
  };
  res.render("user/contact.ejs", obj);
});
router.get("/profile", async function (req, res) {
  var user_id = req.session._id;

  var data = await userModel.find({ _id: user_id });
  // var user_info =await userModel.find({
  //     "user_id": user_id
  //   });

  obj = {
    is_login: req.session._id ? true : false,
    user_info: data[0],
  };

  res.render("user/profile.ejs", obj);
});

router.get("/edit_profile/:id", async function (req, res) {
  var id = req.params.id;
  var data = await userModel.findById(id);
  var obj = {
    is_login: req.session._id ? true : false,
    data: data,
  };
  res.render("user/edit_profile.ejs", obj);
});
router.post("/update_profile/:id", async function (req, res) {
  var id = req.params.id;
  var newprofile = await userModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/profile");
});

router.get("/logout", checklogin, function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});
router.get("/login", function (req, res) {
  var obj = {
    is_login: req.session._id ? true : false,
  };
  res.render("user/login.ejs", obj);
});
router.get("/signup", function (req, res) {
  var obj = {
    is_login: req.session._id ? true : false,
  };
  res.render("user/signup.ejs", obj);
});
router.post("/do_register", async function (req, res) {
  var newuser = userModel(req.body);
  var data = await newuser.save();
  console.log(data);
  res.redirect("/login");
});
router.post("/do_login", async function (req, res) {
  var data = await userModel.find({
    mobile_number: req.body.mobile_number,
    password: req.body.password,
  });
  if (data.length > 0) {
    req.session._id = data[0]._id;
    res.redirect("/");
    // res.send("login succeas")
  } else {
    res.send("<script> alert('invalid Details');history.back(); </script>");
  }
  //   res.send(req.body);
});
router.post("/save_appointment", async function (req, res) {
  var newappointment = appointmentModel(req.body);
  var data = await newappointment.save();
  //  console.log(newmainslider);

  // res.send(newmainslider);
  res.redirect("/contact");
});
module.exports = router;
