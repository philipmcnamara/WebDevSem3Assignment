"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const POISchema = new Schema({
  amount: Number,
  method: String,
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("POI", POISchema);