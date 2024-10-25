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

var adminModel = require("../models/adminModel");

const router = express.Router();

function check(req, res, next) {
  if (req.session.id != undefined) next();
  else
    res.send(
      "<script>alert('login first');location.href = '/admin/';</script>"
    );
}

// router.get("/",function(req,res){
//     res.render("admin/home.ejs");
// });
// router.post("/do_register",async function(req,res){

//   var newadmin = adminModel(req.body);
//   var data = await newadmin.save();s
//   console.log(data);
//    res.redirect("/admin/login");

// });
router.get("/", async function (req, res) {
  res.render("admin/login.ejs");
});

router.post("/do_login", async function (req, res) {
  var data = await adminModel.find({
    mobile: req.body.mobile,
    password: req.body.password,
  });
  if (data.length > 0) {
    req.session.id = data[0].id;
    res.redirect("/admin/home");
    // res.send("login succeas")
  } else {
    res.send("<script> alert('invalid Details');history.back(); </script>");
  }
  //   res.send(req.body);
});

router.get("/Logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/admin");
      }
    });
  }
});

router.get('/home',check,  async function(req, res) {
  res.render('admin/home', {
      is_login: req.session.id ? true : false
  });
});



router.get("/main_slider", async function (req, res) {
  var data = await mainsliderModel.find();
  var obj = {
    main_slider: data,
    is_login: req.session.id ? true : false,
  };

  res.render("admin/main_slider.ejs", obj);
});

router.post("/save_main_slider", async function (req, res) {
  var slider_image = "";

  if (req.files != null) {
    if (req.files.slider_image != undefined) {
      slider_image = new Date().getTime() + req.files.slider_image.name;
      req.files.slider_image.mv("public/uploads/" + slider_image);
    }
  }
  req.body.slider_image = slider_image;

  var newmainslider = mainsliderModel(req.body);
  var data = await newmainslider.save();
  //  console.log(newmainslider);

  // res.send(newmainslider);
  res.redirect("/admin/main_slider");
});

router.get("/edit_main_slider/:id", async function (req, res) {
  var id = req.params.id;
  var main_sliders = await mainsliderModel.findById(id);
  res.render("admin/edit_main_slider.ejs", { main_slider: main_sliders });
});

router.post("/update_main_slider/:id", async function (req, res) {
  if (req.files) {
    if (req.files.slider_image != undefined) {
      var slider_image = new Date().getTime() + req.files.slider_image.name;
      req.files.slider_image.mv("public/uploads/" + slider_image);
    }
  }
  req.body.slider_image = slider_image;

  var id = req.params.id;
  var newdata = await mainsliderModel.findOneAndUpdate({ _id: id }, req.body);
  //  res.send(newdata);
  res.redirect("/admin/main_slider");
});

router.get("/delete_main_slider/:id", async function (req, res) {
  var id = req.params.id;
  var record = await mainsliderModel.findOneAndDelete({ _id: id });
  // res.send(record);
  res.redirect("/admin/main_slider");
});

router.get("/home_facilties", async function (req, res) {
  var data = await facilitiesModel.find();
  var obj = {
    is_login: req.session.id ? true : false,

    home_facility: data,
  };

  res.render("admin/home_facitlity.ejs", obj);
});
router.post("/save_home_facility", async function (req, res) {
  var newfacility = facilitiesModel(req.body);
  var data = await newfacility.save();
  // res.send(newfacility);
  res.redirect("/admin/home_facilties");
});
router.get("/edit_home_facility/:id", async function (req, res) {
  var id = req.params.id;
  var data = await facilitiesModel.findById(id);
  var obj = { home_facility: data };
  res.render("admin/edit_home_facility.ejs", obj);
});
router.post("/update_home_facility/:id", async function (req, res) {
  // var id = req.params.id;
  // var data = await facilitiesModel.findOneAndUpdate({"id":id},req.body);
  // res.send(data);
  // res.redirect("/admin/home_facilties");
  var id = req.params.id;
  var newdata = await facilitiesModel.findOneAndUpdate({ _id: id }, req.body);
  //  res.send(newdata);
  res.redirect("/admin/home_facilties");
});
router.get("/delete_home_facility/:id", async function (req, res) {
  var id = req.params.id;
  var data = await facilitiesModel.findOneAndDelete({ _id: id });
  res.redirect("/admin/home_facilties");
});

router.get("/home_swasthya", async function (req, res) {
  var data = await homeswashtyaModel.find();
  var obj = {
    home_swasthya: data,
    is_login: req.session.id ? true : false,
  };

  res.render("admin/home_swasthya.ejs", obj);
});
router.post("/save_home_swasthya", async function (req, res) {
  var image = "";

  if (req.files != null) {
    if (req.files.slider_image != undefined) {
      image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var newhomeswasthya = homeswashtyaModel(req.body);
  var data = await newhomeswasthya.save();
  // res.send(newhomeswasthya);
  res.redirect("/admin/home_swasthya");
});
router.get("/edit_home_swasthya/:id", async function (req, res) {
  var id = req.params.id;
  var data = await homeswashtyaModel.findById(id);
  var obj = { home_swasthya: data };
  res.render("admin/edit_home_swasthya.ejs", obj);
});
router.post("/update_home_swasthya/:id", async function (req, res) {
  if (req.files) {
    if (req.files.image != undefined) {
      var image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var id = req.params.id;
  var newdata = await homeswashtyaModel.findOneAndUpdate({ _id: id }, req.body);
  //  res.send(newdata);
  res.redirect("/admin/home_swasthya");
});

router.get("/delete_home_swasthya/:id", async function (req, res) {
  var id = req.params.id;
  var data = await homeswashtyaModel.findOneAndDelete({ _id: id });
  res.redirect("/admin/home_swasthya");
});
router.get("/home_deppart1", async function (req, res) {
  var data = await homedeppart1Model.find();
  var obj = {
    homedeppart1: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/homedep_part1.ejs", obj);
});
router.post("/save_homedep_part1", async function (req, res) {
  var image = "";

  if (req.files != null) {
    if (req.files.image != undefined) {
      image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var newhomedeppart1 = homedeppart1Model(req.body);
  var data = await newhomedeppart1.save();
  // res.send(newhomeswasthya);
  res.redirect("/admin/home_deppart1");
});
router.get("/home_depdoctors", async function (req, res) {
  var data = await homedepdoctorsModel.find();
  var obj = {
    homedep_doctors: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/homedepdoctors.ejs", obj);
});
router.post("/save_homedep_doctors", async function (req, res) {
  var image = "";

  if (req.files != null) {
    if (req.files.image != undefined) {
      image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var newhomedepdoctors = homedepdoctorsModel(req.body);

  var data = await newhomedepdoctors.save();
  res.redirect("/admin/home_depdoctors");
});
router.get("/edit_homedep_doctors/:id", async function (req, res) {
  var id = req.params.id;
  var data = await homedepdoctorsModel.findById(id);
  var obj = { homedep_doctors: data };
  res.render("admin/edit_homedepdoctors.ejs", obj);
});
router.post("/update_homedep_doctors/:id", async function (req, res) {
  var id = req.params.id;

  if (req.files) {
    if (req.files.image != undefined) {
      var image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var data = await homedepdoctorsModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/home_depdoctors");
});
router.get("/delete_homedep_doctors/:id", async function (req, res) {
  var id = req.params.id;

  var data = await homedepdoctorsModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/home_depdoctors");
});
router.get("/home_ambulance", async function (req, res) {
  var data = await homeambulanceModel.find();
  var obj = {
    home_ambulance: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/home_ambulance.ejs", obj);
});
router.post("/save_home_ambulance", async function (req, res) {
  var image = "";

  if (req.files != null) {
    if (req.files.image != undefined) {
      image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var newhomeambulance = homeambulanceModel(req.body);

  var data = await newhomeambulance.save();
  res.redirect("/admin/home_ambulance");
});
router.get("/edit_home_ambulance/:id", async function (req, res) {
  var id = req.params.id;
  var data = await homeambulanceModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_home_ambulance.ejs", obj);
});
router.post("/update_home_ambulance/:id", async function (req, res) {
  var id = req.params.id;

  if (req.files) {
    if (req.files.image != undefined) {
      var image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;
  var data = await homeambulanceModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/home_ambulance");
});
router.get("/delete_home_ambulance/:id", async function (req, res) {
  var id = req.params.id;
  var data = await homeambulanceModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/home_ambulance");
});

// home stat
router.get("/home_stat", async function (req, res) {
  var data = await homestatModel.find();
  var obj = {
    home_stat: data,
    is_login: req.session.id ? true : false,
  };

  res.render("admin/home_stat.ejs", obj);
});
router.post("/save_home_stat", async function (req, res) {
  var newhomestat = homestatModel(req.body);

  var data = await newhomestat.save();
  res.redirect("/admin/home_stat");
});
router.get("/edit_home_stat/:id", async function (req, res) {
  var id = req.params.id;
  var data = await homestatModel.findById(id);
  var obj = {
    data: data,
  };
  res.render("admin/edit_home_stat.ejs", obj);
});
router.post("/update_home_stat/:id", async function (req, res) {
  var id = req.params.id;
  var newhomestat = await homestatModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/home_stat");
});
router.get("/delete_home_stat/:id", async function (req, res) {
  var id = req.params.id;
  var data = await homestatModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/home_stat");
});

// home vision

router.get("/home_vision", async function (req, res) {
  var data = await homevisionModel.find();
  var obj = {
    home_vision: data,
    is_login: req.session.id ? true : false,
  };

  res.render("admin/home_vision.ejs", obj);
});

router.post("/save_home_vision", async function (req, res) {
  var image = "";

  if (req.files != null) {
    if (req.files.image != undefined) {
      image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var newhomevision = homevisionModel(req.body);

  var data = await newhomevision.save();
  res.redirect("/admin/home_vision");
});
router.get("/edit_home_vision/:id", async function (req, res) {
  var id = req.params.id;
  var data = await homevisionModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_home_vision.ejs", obj);
});
router.post("/update_home_vision/:id", async function (req, res) {
  var id = req.params.id;

  if (req.files) {
    if (req.files.image != undefined) {
      var image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;
  var data = await homevisionModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/home_vision");
});
router.get("/delete_home_vision/:id", async function (req, res) {
  var id = req.params.id;
  var data = await homevisionModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/home_vision");
});

// home testimonial

router.get("/home_testimonial", async function (req, res) {
  var data = await hometestimonialModel.find();
  var obj = {
    home_testimonial: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/home_testimonial.ejs", obj);
});
router.post("/save_home_testimonial", async function (req, res) {
  var image = "";

  if (req.files != null) {
    if (req.files.image != undefined) {
      image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var newhometestimonial = hometestimonialModel(req.body);

  var data = await newhometestimonial.save();
  res.redirect("/admin/home_testimonial");
});
router.get("/edit_home_testimonial/:id", async function (req, res) {
  var id = req.params.id;
  var data = await hometestimonialModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_home_testimonial.ejs", obj);
});
router.post("/update_home_testimonial/:id", async function (req, res) {
  var id = req.params.id;

  if (req.files) {
    if (req.files.image != undefined) {
      var image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;
  var data = await hometestimonialModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/home_testimonial");
});
router.get("/delete_home_testimonial/:id", async function (req, res) {
  var id = req.params.id;
  var data = await hometestimonialModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/home_testimonial");
});

// cardiology starts
// cardiology main

router.get("/cardiology_main", async function (req, res) {
  var data = await cardiologymainModel.find();
  var obj = {
    cardiology_main: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/cardiology_main.ejs", obj);
});

router.post("/save_cardiology_main", async function (req, res) {
  var image = "";

  if (req.files != null) {
    if (req.files.image != undefined) {
      image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var newcardiologymain = cardiologymainModel(req.body);

  var data = await newcardiologymain.save();
  res.redirect("/admin/cardiology_main");
});
router.get("/edit_cardiology_main/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cardiologymainModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_cardiology_main.ejs", obj);
});
router.post("/update_cardiology_main/:id", async function (req, res) {
  var id = req.params.id;

  if (req.files) {
    if (req.files.image != undefined) {
      var image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;
  var data = await cardiologymainModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/cardiology_main");
});
router.get("/delete_cardiology_main/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cardiologymainModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/cardiology_main");
});

//cardiology part1

router.get("/cardiology_part1", async function (req, res) {
  var data = await cardiologypart1Model.find();
  var obj = {
    cardiology_part1: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/cardiology_part1.ejs", obj);
});
router.post("/save_cardiology_part1", async function (req, res) {
  var newcardiologypart1 = cardiologypart1Model(req.body);

  var data = await newcardiologypart1.save();
  res.redirect("/admin/cardiology_part1");
});
router.get("/edit_cardiology_part1/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cardiologypart1Model.findById(id);
  var obj = { data: data };
  res.render("admin/edit_cardiology_part1.ejs", obj);
});
router.post("/update_cardiology_part1/:id", async function (req, res) {
  var id = req.params.id;

  var data = await cardiologypart1Model.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/cardiology_part1");
});
router.get("/delete_cardiology_part1/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cardiologypart1Model.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/cardiology_part1");
});

//cardiology part2

router.get("/cardiology_part2", async function (req, res) {
  var data = await cardiologypart2Model.find();
  var obj = {
    cardiology_part2: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/cardiology_part2.ejs", obj);
});
router.post("/save_cardiology_part2", async function (req, res) {
  var image = "";

  if (req.files != null) {
    if (req.files.image != undefined) {
      image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var newcardiologypart2 = cardiologypart2Model(req.body);

  var data = await newcardiologypart2.save();
  res.redirect("/admin/cardiology_part2");
});
router.get("/edit_cardiology_part2/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cardiologypart2Model.findById(id);
  var obj = { data: data };
  res.render("admin/edit_cardiology_part2.ejs", obj);
});
router.post("/update_cardiology_part2/:id", async function (req, res) {
  var id = req.params.id;
  if (req.files) {
    if (req.files.image != undefined) {
      var image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var data = await cardiologypart2Model.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/cardiology_part2");
});
router.get("/delete_cardiology_part2/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cardiologypart2Model.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/cardiology_part2");
});

//cardiology part3

router.get("/cardiology_part3", async function (req, res) {
  var data = await cardiologypart3Model.find();
  var obj = {
    cardiology_part3: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/cardiology_part3.ejs", obj);
});

router.post("/save_cardiology_part3", async function (req, res) {
  var newcardiologypart3 = cardiologypart3Model(req.body);

  var data = await newcardiologypart3.save();
  res.redirect("/admin/cardiology_part3");
});
router.get("/edit_cardiology_part3/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cardiologypart3Model.findById(id);
  var obj = { data: data };
  res.render("admin/edit_cardiology_part3.ejs", obj);
});
router.post("/update_cardiology_part3/:id", async function (req, res) {
  var id = req.params.id;

  var data = await cardiologypart3Model.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/cardiology_part3");
});
router.get("/delete_cardiology_part3/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cardiologypart3Model.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/cardiology_part3");
});

// obstetricks

router.get("/obstetricks_main", async function (req, res) {
  var data = await obstetricksmainModel.find();
  var obj = {
    obstetricks_main: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/obstetricks_main.ejs", obj);
});
router.post("/save_obstetricks_main", async function (req, res) {
  var image = "";

  if (req.files != null) {
    if (req.files.image != undefined) {
      image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var newobstetricksmain = obstetricksmainModel(req.body);

  var data = await newobstetricksmain.save();
  res.redirect("/admin/obstetricks_main");
});
router.get("/edit_obstetricks_main/:id", async function (req, res) {
  var id = req.params.id;
  var data = await obstetricksmainModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_obstetricks_main.ejs", obj);
});
router.post("/update_obstetricks_main/:id", async function (req, res) {
  var id = req.params.id;

  if (req.files) {
    if (req.files.image != undefined) {
      var image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;
  var data = await obstetricksmainModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/obstetricks_main");
});
router.get("/delete_obstetricks_main/:id", async function (req, res) {
  var id = req.params.id;
  var data = await obstetricksmainModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/obstetricks_main");
});

router.get("/obstetricks_part3", async function (req, res) {
  var data = await obstetrickspart3Model.find();
  var obj = {
    obstetricks_part3: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/obstetricks_part3.ejs", obj);
});
router.post("/save_obstetricks_part3", async function (req, res) {
  var newobstetrickspart3 = obstetrickspart3Model(req.body);

  var data = await newobstetrickspart3.save();
  res.redirect("/admin/obstetricks_part3");
});
router.get("/edit_obstetricks_part3/:id", async function (req, res) {
  var id = req.params.id;
  var data = await obstetrickspart3Model.findById(id);
  var obj = { data: data };
  res.render("admin/edit_obstetricks_part3.ejs", obj);
});
router.post("/update_obstetricks_part3/:id", async function (req, res) {
  var id = req.params.id;

  var data = await obstetrickspart3Model.findOneAndUpdate(
    { _id: id },
    req.body
  );
  res.redirect("/admin/obstetricks_part3");
});
router.get("/delete_obstetricks_part3/:id", async function (req, res) {
  var id = req.params.id;
  var data = await obstetrickspart3Model.findOneAndDelete(
    { _id: id },
    req.body
  );
  res.redirect("/admin/obstetricks_part3");
});

// facility page
router.get("/facility_img", async function (req, res) {
  var data = await facilityimgModel.find();
  var obj = {
    facility_img: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/facility_img.ejs", obj);
});
router.post("/save_facility_img", async function (req, res) {
  var image = "";

  if (req.files != null) {
    if (req.files.image != undefined) {
      image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;

  var newfacilityimg = facilityimgModel(req.body);

  var data = await newfacilityimg.save();
  res.redirect("/admin/facility_img");
});

router.get("/edit_facility_img/:id", async function (req, res) {
  var id = req.params.id;
  var data = await facilityimgModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_facility_img.ejs", obj);
});
router.post("/update_facility_img/:id", async function (req, res) {
  var id = req.params.id;

  if (req.files) {
    if (req.files.image != undefined) {
      var image = new Date().getTime() + req.files.image.name;
      req.files.image.mv("public/uploads/" + image);
    }
  }
  req.body.image = image;
  var data = await facilityimgModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/facility_img");
});
router.get("/delete_facility_img/:id", async function (req, res) {
  var id = req.params.id;
  var data = await facilityimgModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/facility_img");
});

// cashless page
// cashless tpa

router.get("/cashless_facility", async function (req, res) {
  var data = await cashlessfacilityModel.find();
  var obj = {
    cashless_facility: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/cashless_facility.ejs", obj);
});
router.post("/save_cashless_facility", async function (req, res) {
  var newcashlessfacility = cashlessfacilityModel(req.body);

  var data = await newcashlessfacility.save();
  res.redirect("/admin/cashless_facility");
});
router.get("/edit_cashless_facility/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cashlessfacilityModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_cashless_facility.ejs", obj);
});
router.post("/update_cashless_facility/:id", async function (req, res) {
  var id = req.params.id;

  var data = await cashlessfacilityModel.findOneAndUpdate(
    { _id: id },
    req.body
  );
  res.redirect("/admin/cashless_facility");
});
router.get("/delete_cashless_facility/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cashlessfacilityModel.findOneAndDelete(
    { _id: id },
    req.body
  );
  res.redirect("/admin/cashless_facility");
});

// cashless tpa

router.get("/cashless_tpa", async function (req, res) {
  var data = await cashlesstpaModel.find();
  var obj = {
    cashless_tpa: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/cashless_tpa.ejs", obj);
});
router.post("/save_cashless_tpa", async function (req, res) {
  var newcashlesstpa = cashlesstpaModel(req.body);

  var data = await newcashlesstpa.save();
  res.redirect("/admin/cashless_tpa");
});
router.get("/edit_cashless_tpa/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cashlesstpaModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_cashless_tpa.ejs", obj);
});
router.post("/update_cashless_tpa/:id", async function (req, res) {
  var id = req.params.id;

  var data = await cashlesstpaModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/cashless_tpa");
});
router.get("/delete_cashless_tpa/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cashlesstpaModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/cashless_tpa");
});

//cashless govn

router.get("/cashless_govn", async function (req, res) {
  var data = await cashlessgovnModel.find();
  var obj = {
    cashless_govn: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/cashless_govn.ejs", obj);
});
router.post("/save_cashless_govn", async function (req, res) {
  var newcashlessgovn = cashlessgovnModel(req.body);

  var data = await newcashlessgovn.save();
  res.redirect("/admin/cashless_govn");
});
router.get("/edit_cashless_govn/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cashlessgovnModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_cashless_govn.ejs", obj);
});
router.post("/update_cashless_govn/:id", async function (req, res) {
  var id = req.params.id;

  var data = await cashlessgovnModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/cashless_govn");
});
router.get("/delete_cashless_govn/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cashlessgovnModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/cashless_govn");
});

// cashless policy

router.get("/cashless_policy", async function (req, res) {
  var data = await cashlesspolicyModel.find();
  var obj = {
    cashless_policy: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/cashless_policy.ejs", obj);
});
router.post("/save_cashless_policy", async function (req, res) {
  var newcashlesspolicy = cashlesspolicyModel(req.body);

  var data = await newcashlesspolicy.save();
  res.redirect("/admin/cashless_policy");
});
router.get("/edit_cashless_policy/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cashlesspolicyModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_cashless_policy.ejs", obj);
});
router.post("/update_cashless_policy/:id", async function (req, res) {
  var id = req.params.id;

  var data = await cashlesspolicyModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/cashless_policy");
});
router.get("/delete_cashless_policy/:id", async function (req, res) {
  var id = req.params.id;
  var data = await cashlesspolicyModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/cashless_policy");
});

//contact detail.
router.get("/contact", async function (req, res) {
  var data = await contactModel.find();
  var obj = {
    contact: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/contact.ejs", obj);
});
router.post("/save_contact", async function (req, res) {
  var newcontact = contactModel(req.body);
  var data = await newcontact.save();
  res.redirect("/admin/contact");
});
router.get("/edit_contact/:id", async function (req, res) {
  var id = req.params.id;
  var data = await contactModel.findById(id);
  var obj = { data: data };
  res.render("admin/edit_contact.ejs", obj);
});
router.post("/update_contact/:id", async function (req, res) {
  var id = req.params.id;
  var newcontact = await contactModel.findOneAndUpdate({ _id: id }, req.body);
  res.redirect("/admin/contact");
});
router.get("/delete_contact/:id", async function (req, res) {
  var id = req.params.id;
  var data = await contactModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/contact");
});

//user appointment

router.get("/user_appointment", async function (req, res) {
  var data = await appointmentModel.find();
  var obj = {
    user_appointment: data,
    is_login: req.session.id ? true : false,
  };
  res.render("admin/user_appointment.ejs", obj);
});
router.get("/delete_user_appointment/:id", async function (req, res) {
  var id = req.params.id;

  var data = await appointmentModel.findOneAndDelete({ _id: id }, req.body);
  res.redirect("/admin/user_appointment");
});

module.exports = router;
