var {
    Land,
    User
} = require("../db/mongoose");
landsData = require('../static/landsData.json');
usersData = require('../static/usersData.json');

exports.reset = function (req, res) {

    // get refs to the models
    //var Land = mongoose.model('Land');
    //var User = mongoose.model('User');

    // clear all existing documents from the collections
    Land.find().remove();
    User.find().remove();

    // populate the users collection from json data
    for (var i = 0; i < usersData.length; i++) {
        new User(usersData[i]).save();
    }

    // populate the lands collection from json data
    for (var i = 0; i < landsData.length; i++) {
        new Land(landsData[i]).save();
    }

    res.redirect("/");
    console.log("data saved on mongo db");
};