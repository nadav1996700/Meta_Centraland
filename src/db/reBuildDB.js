const Land = require("./Land");
const User = require("./User");
const fs = require("fs");
const path = require("path");

function reset() {
  // clear all existing documents from the collections
  Land.find({}).deleteMany().exec();
  User.find({}).deleteMany().exec();

  const jsonPath = path.join(__dirname, "..", "static", "usersData.json");
  const data = fs.readFileSync(jsonPath, "utf8");
  const users_data = JSON.parse(data);
  // populate the users collection from json data
  for (var i = 0; i < users_data.length; i++) {
    new User(users_data[i]).save();
  }

  // populate the lands collectio
  const numberOfLands = 100;
  const parkLands = [50, 60, 70, 80];
  const roadLands = [52, 53, 54, 55, 56, 57, 62, 72];
  const max = 200,
    min = 15;
  for (var i = 0; i < numberOfLands; i++) {
    let isPark = parkLands.some((element) => element === i);
    let isRoad = roadLands.some((element) => element === i);
    let canBeSale = !isPark && !isRoad && i < 40 ? true : false;
    new Land({
      id: i,
      owner: "Nadav.Ltd",
      can_be_sale: canBeSale,
      price: canBeSale ? Math.floor(Math.random() * (max - min + 1) + min) : 0,
      game: "",
      isPark: isPark,
      isRoad: isRoad,
    }).save();
  }

  console.log("initialized data on mongo db");
}

module.exports = { reset };
