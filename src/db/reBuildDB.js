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

  let roadLands = [];

  const createRoads = () => {
    let i, j;
    for (i = 5, j = 6; i <= 9955 || j <= 9956; i += 50, j += 50) {
      roadLands.push(i);
      roadLands.push(j);
    }
    for (i = 501, j = 551; i <= 550 || j <= 600; i++, j++) {
      roadLands.push(i);
      roadLands.push(j);
    }
    for (i = 1101, j = 1151; i <= 1150 || j <= 1200; i++, j++) {
      roadLands.push(i);
      roadLands.push(j);
    }
    for (i = 2401, j = 2451; i <= 2450 || j <= 2500; i++, j++) {
      roadLands.push(i);
      roadLands.push(j);
    }
  };

  // populate the users collection from json data
  for (var i = 0; i < users_data.length; i++) {
    new User(users_data[i]).save();
  }

  // populate the lands collection
  const numberOfLands = 10000;
  const parkLands = [
    1515, 1565, 1615, 1665, 1715, 1765, 1815, 1865, 1915, 1965, 2015, 2065,
    2115, 2165, 1516, 1567, 1618, 1669, 1720, 1771, 1822, 1873, 1924, 1975,
    2026, 2077, 2128, 2179, 2129, 2079, 2029, 1979, 1929, 1879, 1829, 1779,
    1729, 1679, 1629, 1579, 1529, 1739, 1535, 1586, 1637, 1688, 1690, 1641,
    1592, 1543, 1789, 1839, 1889, 1939, 1989, 2039, 2089, 2189, 2139,
  ];

  const max = 200,
    min = 15;
  const landsList = [];
  createRoads();
  for (var i = 1; i <= numberOfLands; i++) {
    let isPark = parkLands.some((element) => element === i);
    //let isRoad = i;
    let isRoad = roadLands.some((element) => element === i);
    let canBeSale = !isPark && !isRoad && i <= 250 ? true : false;
    landsList.push(
      new Land({
        id: i,
        ownerName: "Nadav&Yarden.Ltd",
        ownerEmail: "NadavAndYarden@gmail.com",
        can_be_sale: canBeSale,
        price: Math.floor(Math.random() * (max - min + 1) + min),
        game: "",
        isPark: isPark,
        isRoad: isRoad,
      })
    );
  }
  // save all lands to db
  Land.insertMany(landsList).then(console.log("initialized data on mongo db"));
}

module.exports = { reset };
