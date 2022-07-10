const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const LandSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
  can_be_sale: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  game: {
    type: String,
    required: false,
  },
  isPark: {
    type: Boolean,
    required: true,
  },
  isRoad: {
    type: Boolean,
    required: true,
  },
});

// Model
const Land = mongoose.model("Land", LandSchema);

module.exports = Land;
