// UserRouter.js

const express = require("express");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();

const User = require("../db/User");

// signup
UserRouter.route("/signup").post(async function (req, res) {
  const email = req.body.email;
  const newUser = new User(req.body);
  var userAlreadyExist = false;

  User.find({ email: email }, async function (err, user) {
    if (err) {
      console.log("Signup error");
      console.log(err);
      return;
    }

    // if user found
    if (user.length != 0) {
      userAlreadyExist = true;
      if (user[0].email) {
        res.status(400).send("Email already exists, email: " + email);
        console.log("trying to signup with email that already exist failed");
      }
    } else {
      // user does not found
      if (userAlreadyExist === false) {
        // generate salt to hash password
        bcrypt.genSalt(10, async function (err, salt) {
          if (err) {
            return console.log("cannot encrypt");
          } else {
            newUser.password = await bcrypt.hash(newUser.password, salt);
            // save user to db
            newUser
              .save()
              .then(() => {
                res.status(200).json("User added successfully");
              })
              .catch((err) => {
                res.status(400).send("unable to save user:" + err);
                console.log(err);
              });
          }
        });
      }
    }
  });
});

// login
UserRouter.route("/login").post(async function (req, res) {
  const body = req.body;

  const user = await User.findOne({ email: body.email });
  // if user found
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      console.log(
        "server message: user with email: " +
          body.email +
          " and password: " +
          body.password +
          " logged in succesfully"
      );
      res.status(200).send(JSON.stringify(user));
    } else {
      console.log(
        "server message: user with email: " +
          body.email +
          " and password: " +
          body.password +
          " does not found"
      );
      res.status(400).send("failure");
    }
  } else {
    res.status(400).send("cant find user with that email");
  }
});

module.exports = UserRouter;
