const express = require("express");
const LandRouter = express.Router();
const Land = require("../db/Land");

// get all Lands
LandRouter.route("/getAllLands").get(function (req, res) {
  Land.find({}, function (err, lands) {
    if (err) {
      console.log("Error: " + err);
      res.status(400).send("error occured!");
      return;
    } else {
      res.send(lands);
    }
  });
});

module.exports = LandRouter;
