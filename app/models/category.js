"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const categorySchema = Schema({
  category: String,
  lastName: String,
  office: String,

});

module.exports = Mongoose.model("Category", categorySchema);
