require("dotenv").config();
const express = require("express");
const path = require("path");
const UserRoute = require("./routes/userRouter");
const LandRoute = require("./routes/landRouter");
const mongoose = require("./db/mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

const app = express();
const port = process.env.PORT || 3001;

// Define paths for Express config
const staticPath = path.join(__dirname, "../static");

// Setup static directory to serve
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", cors(), UserRoute);
app.use("/land", cors(), LandRoute);

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionSuccessStatus: 200,
};
router.use(cors(corsOptions));

mongoose.connectToMongo();

// reset the database
router.get("/reset", function () {
  reBuild.reset();
});

router.get("*", (req, res) => {
  res.status(404).send("Page does not found!");
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
