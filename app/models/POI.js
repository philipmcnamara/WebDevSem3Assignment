"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const donationSchema = new Schema({
  amount: String,
  method: String,
  description: String,
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("Donation", donationSchema);
