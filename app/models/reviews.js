"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const reviewSchema = new Schema({
  rating: Number,
  review: String,
  POIid: String,
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

});

module.exports = Mongoose.model("reviews", reviewSchema);

