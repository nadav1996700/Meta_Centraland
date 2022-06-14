require("dotenv").config();
const express = require("express");
const path = require("path");
const UserRoute = require("./routes/userRouter");
const LandRoute = require("./routes/landRouter");
const reBuild = require("./routes/reBuildDB");
const bodyParser = require("body-parser");
const router = express.Router();

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const staticPath = path.join(__dirname, "../static");

// Setup static directory to serve
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", UserRoute);
app.use("/land", LandRoute);

router.get("/", (req, res) => {
  res.status(200).send("website load succefully!");
});

router.get("/reset", (req, res) => {
  reBuild.reset(req, res);
});

router.get("*", (req, res) => {
  res.status(404).send("Page does not found!");
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
