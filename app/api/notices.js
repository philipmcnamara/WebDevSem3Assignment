"use strict";

const Notice = require("../models/notices");
const Boom = require("@hapi/boom");

const Notices = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const notices = await Notice.find();
      return notices;
    },
  },

  addNotice: {
    auth: false,
    handler: async function (request, h) {
      const newNotice = new Notice(request.payload);
      const note = await newNotice.save();
      if (note) {
        return h.response(note).code(201);
      }
      return Boom.badImplementation("error creating Notice");
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await Notice.deleteMany({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const notice = await Notice.deleteOne({ _id: request.params.id });
      if (notice) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};

module.exports = Notices;
