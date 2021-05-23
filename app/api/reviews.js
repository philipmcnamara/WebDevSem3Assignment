"use strict";

const Review = require("../models/reviews");
const Boom = require("@hapi/boom");

const Reviews = {

  find: {
    auth: false,
    handler: async function (request, h) {
      const reviews = await Review.find();
      return reviews;
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      const reviews = await Review.find({ user: request.params.id });
      return reviews;
    },
  },

  createReview: {
    auth: false,
    handler: async function (request, h) {
      const newUser = new Review(request.payload);
      const user = await newUser.save();
      if (user) {
        return h.response(user).code(201);
      }
      return Boom.badImplementation("error creating user");
    },
  },

  addReview: {
    auth: false,
    handler: async function (request, h) {
      let review = new Review(request.payload);
      const user = await Review.findOne({ _id: request.params.id });
      if (!user) {
        return Boom.notFound("No Candidate with this id");
      }
      review.user = user._id;
      review = await review.save();
      return review;
    },
  },

  deleteAllReviews: {
    auth: false,
    handler: async function (request, h) {
      await Review.deleteMany({});
      return { success: true };
    },
  },
  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const review = await Review.deleteOne({ _id: request.params.id });
      if (review) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};

module.exports = Reviews;
