"use strict";
const User = require("../models/user");
const REVIEW = require("../models/reviews");
const POI = require("../models/POI");
const Joi = require("@hapi/joi");


const Reviews = {
  home: {
    handler:async function (request, h) {
      return h.view("home", { title: "Add Review", pois: pois  });
    },
  },

  report: {
    handler: async function (request, h) {
      const POI_ID = request.params.id;
      console.log("POI id in Review is : " + POI_ID);

      const allReviews = await REVIEW.find().populate("reviews").lean();

      let poiReviews = [];
      let index = 0;
      let average = 0;
      let length = 0;
      allReviews.forEach((review) => {
        console.log("reviews.POIid "+review.POIid);
        console.log("POI_ID "+POI_ID);
        if (review.POIid === POI_ID) {
          console.log("eq reviews.POIid "+review.POIid);
          console.log("eq POI_ID "+POI_ID);
          length++;
          average = (average + review.rating) / length;
          poiReviews[index] = review;
          index++;
        }
        return poiReviews;

      });
      return h.view("displayPOI", {
        title: "Reviews So Far",
        reviews: poiReviews,
        average: average
      });
    },
  },

  review: {
    handler: async function(request, h) {
      try {
        const POI_ID = request.params.id
        console.log("PId is : " + POI_ID);
        const id = request.auth.credentials.id;
        const POIid = await POI.findById(POI_ID); // will send POI id in here to link the review to the POI
        const user = await User.findById(id);
        const data = request.payload;
        const newReview = new REVIEW({
          rating: data.rating,
          review: data.review,
          reviewer: user._id,
          POIid: POIid._id
        });
        await newReview.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  },

  showREVIEW: {
    handler: async function(request, h) {
      try {
        console.log("test showreview");
        console.log("test 1");
        return h.view("displayPOI", { title: "Testing",});
      }
      catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    }
  },

  REVIEW: {
    validate: {
      payload: {
        id: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("displayPOI", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const collection = request.payload;
        const id = collection.id
        const record = await REVIEW.findById(id);
        const rating = record.rating;
        const review = record.review;
        const reviewer = record.reviewer;
        const POIid = record.POIid;
        console.log("test Review "+id);
        return h.view("displayPOI",
          { title: "Testing",
            id: id,
            rating: rating,
            review: review,
            reviewer: reviewer,
            POIid: POIid });
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};

module.exports = Reviews;
