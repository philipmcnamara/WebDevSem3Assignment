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

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await POI.deleteMany({});
      return { success: true };
    },
  },
};

module.exports = Pois;
