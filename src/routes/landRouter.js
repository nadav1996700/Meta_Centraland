// LandRouter.js

const express = require("express");
const LandRouter = express.Router();

const Land = require("../db/Land");

// add new Land
LandRouter.route("/create").post(function (req, res) {
  const land = new Land(req.body);
  land
    .save()
    .then((land) => {
      res.json("Land added successfully");
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = LandRouter;
