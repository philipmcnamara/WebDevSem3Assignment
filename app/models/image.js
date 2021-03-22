"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const imageSchema = new Schema({
  image: ImageData,
});



module.exports = Mongoose.model("Image", imageSchema);
