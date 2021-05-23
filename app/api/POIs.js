"use strict";

const POI = require("../models/POI");
const Boom = require("@hapi/boom");

const Pois = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const pois = await POI.find();
      return pois;
    },
  },

  addPOI: {
    auth: false,
    handler: async function (request, h) {
      const newPOI = new POI(request.payload);
      const poi = await newPOI.save();
      if (poi) {
        return h.response(poi).code(201);
      }
      return Boom.badImplementation("error creating POI");
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await POI.deleteMany({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const POI = await POI.deleteOne({ _id: request.params.id });
      if (POI) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },

};

module.exports = Pois;
