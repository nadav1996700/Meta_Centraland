// UserRouter.js

const express = require("express");
const UserRouter = express.Router();

const User = require("../db/User");

// signup
UserRouter.route("/signup").post(function (req, res, next) {
  const email = req.body.email;
  const newUser = new User(req.body);

  User.find({ email: email }, function (err, user) {
    if (err) {
      console.log("Signup error");
      console.log(err);
      return next();
    }

    // if user found
    if (user.length != 0) {
      if (user[0].email) {
        res.status(400).send("Email already exists, email: " + email);
      }
      var err = new Error();
      err.status = 310;
      return;
    }
  });
  // user does not found
  newUser
    .save()
    .then(() => {
      res.status(200).json("User added successfully");
    })
    .catch((err) => {
      res.status(400).send("unable to save user:" + err);
    });
});

// login
UserRouter.route("/login").get(function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  User.find({ email: email, password: password }, function (err, user) {
    if (err) {
      console.log("Signup error");
      return next(err);
    }
    // if user found
    if (user.length != 0) {
      res.status(200).send("user loged in succesfully");
    } else {
      res.status(400).send("user does not found");
    }
  });
});

module.exports = UserRouter;