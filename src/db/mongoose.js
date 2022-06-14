const mongoose = require("mongoose");

// local mongo db
mongoose.connect("mongodb://127.0.0.1:27017/meta_centraland", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// check that mongo start succesfully
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to MongoDB");
});