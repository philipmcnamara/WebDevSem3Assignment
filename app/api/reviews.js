"use strict";

const Review = require("../models/reviews");
const User = require("../models/user");
const Boom = require("@hapi/boom");

const Reviews = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const reviews = await Review.find();
      return reviews;
    },
  },

  findByUser: {
    auth: false,
    handler: async function (request, h) {
      const reviews = await Review.find({ user: request.params.id });
      return reviews;
    },
  },

  addReview: {
    auth: false,
    handler: async function (request, h) {
      let review = new Review(request.payload);
      const user = await User.findOne({ _id: request.params.id });
      if (!user) {
        return Boom.notFound("No Candidate with this id");
      }
      review.user = user._id;
      review = await review.save();
      return review;
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await Review.deleteMany({});
      return { success: true };
    },
  },
};

module.exports = Reviews;
