"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const reviewSchema = new Schema({
  notice: String,
  date: String,
  notifier: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

});

module.exports = Mongoose.model("notices", reviewSchema);

