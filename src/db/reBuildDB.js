const Land = require("./Land");
const User = require("./User");
const fs = require("fs");
const path = require("path");

function reset() {
  // clear all existing documents from the collections
  Land.find({}).deleteMany().exec();
  User.find({}).deleteMany().exec();

  let jsonPath = path.join(__dirname, "..", "static", "usersData.json");
  let data = fs.readFileSync(jsonPath, "utf8");
  const users_data = JSON.parse(data);
  // populate the users collection from json data
  for (var i = 0; i < users_data.length; i++) {
    new User(users_data[i]).save();
  }

  jsonPath = path.join(__dirname, "..", "static", "landsData.json");
  data = fs.readFileSync(jsonPath, "utf8");
  const landsData = JSON.parse(data);
  // populate the lands collection from json data
  for (var i = 0; i < landsData.length; i++) {
    new Land(landsData[i]).save();
  }

  console.log("data saved on mongo db");
}

module.exports = { reset };
