const express = require("express");
const LandRouter = express.Router();
const Land = require("../db/Land");
const User = require("../db/User");

// get all Lands
LandRouter.route("/getAllLands").get(function (req, res) {
  Land.find({}, function (err, lands) {
    if (err) {
      console.log("Error: " + err);
      res.status(400).send("error occured!");
    } else {
      res.send(lands);
    }
  });
});

// add game address to specific land
LandRouter.route("/setGame").put(function (req, res) {
  Land.findOneAndUpdate(req.body.id, { game: req.body.gameAddress }).exec(
    function (err, land) {
      if (err) {
        console.log("Error: " + err);
        res.status(400).send("error occured!");
      } else {
        res
          .status(200)
          .send(
            "land game address changed succesfully to " + req.body.gameAddress
          );
      }
    }
  );
});

// change price of land
LandRouter.route("/setPrice").put(function (req, res) {
  Land.findOneAndUpdate(req.body.id, { price: req.body.newPrice }).exec(
    function (err, land) {
      if (err) {
        console.log("Error: " + err);
        res.status(400).send("error occured!");
      } else {
        res
          .status(200)
          .send("land price changed succesfully to " + req.body.newPrice);
      }
    }
  );
});

// update the land status - "not for sale" or "for sale"
LandRouter.route("/isForSale").put(function (req, res) {
  Land.findOneAndUpdate(req.body.id, {
    can_be_sale: req.body.can_be_sale,
  }).exec(function (err, land) {
    if (err) {
      console.log("Error: " + err);
      res.status(400).send("error occured!");
    } else {
      res.status(200).json({
        message: "land status changed to " + land.can_be_sale,
        land: land,
      });
    }
  });
});

// Transfer ownership of land between users:
// 1. update the user that currently buy the land as owner of the land
// 2. update the land as "not for sale"
// 3. decrease the buyer budget by the land price
// 4. increase the seller budget by the land price
LandRouter.route("/transferOwnership").put(function (req, res) {
  // add the price of the land to the seller budget
  User.findOneAndUpdate(
    { email: req.body.sellerEmail },
    {
      $inc: { budget: req.body.landPrice },
    }
  ).exec(function (err, result) {
    if (err) {
      res.status(400).send("error occured on update budget for seller");
    }
  });

  // deacrease the price of the land from the buyer budget
  User.findOneAndUpdate(
    { email: req.body.buyerEmail },
    {
      $inc: { budget: -1 * req.body.landPrice },
    }
  ).exec(function (err, result) {
    if (err) {
      res.status(400).send("error occured on update budget for buyer");
    }
  });

  // upadte land data - owner and status
  Land.findOneAndUpdate(req.body.landId, {
    ownerName: req.body.buyerName + ".Ltd",
    ownerEmail: req.body.buyerEmail,
    can_be_sale: false,
  }).exec(function (err, land) {
    if (err) {
      res.status(400).send("error occured!");
    } else {
      res
        .status(200)
        .json({
          message: "land with id: " + req.body.landId + " selled succesfully",
          land: land,
        });
      //.send("land with id: " + req.body.landId + " selled succesfully");
    }
  });
});

module.exports = LandRouter;
