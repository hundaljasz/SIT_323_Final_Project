
//libraries
const express = require("express");
const router = express.Router();
var session = require("express-session");

//models
const HPProfileData = require("../models/CreateHPProfileModel");
const UpdateFoodData = require("../models/UpdateFoodModel");
const signupinfo = require("../models/Signup");



/***********************************************************
Author              : jaskirat singh
Last Modified Date  : 09-02-2023
Description         : Dashboard code 
**********************************************************/

// Define a dashboard page route
router.get("/view", (req, res) => {
  if (typeof req.session.userid == "undefined") {
    res.redirect("/");
    return true;
  }
  var userId = req.session.userid;
  var userType = req.session.userType;
  if (userType != 1 && userType != 2) {
    HPProfileData.find({ vol_id: userId }, function (err, profileData) {
      res.render("../public/views/Dashboard.ejs", {
        profileData: profileData,
        userType: userType,
      });
    });
  }
  if (userType == 1 || userType == 2) {
    UpdateFoodData.find({}, function (err, foodData) {
      res.render("../public/views/Dashboard.ejs", {
        foodData: foodData,
        userType: userType,
      });
    });
  }
});

module.exports = router;
