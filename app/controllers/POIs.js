"use strict";
const POI = require("../models/POI");
const User = require("../models/user");
const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");


const Pois = {
  home: {
    handler: function(request, h) {
      return h.view("home", { title: "Add a POI" });
    }
  },
  report: {
    handler: async function(request, h) {
      const pois = await POI.find().populate("poi").lean();
      return h.view("report", {
        title: "POI's",
        pois: pois
      });
    }
  },
  poi: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const newPoi = new POI({
          name: data.name,
          category: data.category,
          description: data.description,
          author: user._id
        });
        await newPoi.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  },

  showPOI: {
    handler: async function(request, h) {
      try {
        console.log("test showpoi");
        //  const poi = await Donation.findById(id).lean();
        console.log("test 1");
        //console.log(id,poi);
        return h.view("displayPOI", { title: "Testing",});
      }
      catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    }
  },

  POI: {
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
        console.log("test POI "+id);
        const poi = await POI.findById(id);
        const name = poi.name;
        const category = poi.category;
        const description = poi.description;
        return h.view("displayPOI", { title: "Testing", id: id, name: name, category: category, description: description });
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  UpdatePOI: {
    validate: {
      payload: {
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
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
        //const id = request.params._id
        //const userEdit = request.payload;
        const collection = request.payload;
        const id = collection.id
        const name = collection.name;
        const category = collection.category;
        const description = collection.description;
        const record = await POI.findById(id);
        console.log("Name: "+collection.name);
        record.name = name;
        record.category = category;
        record.description = description;
        await record.save();
        return h.view("displayPOI", { title: "Testing", id: id, name: name, category: category, description: description });
        // return h.redirect("/displayPOI",{id:id});
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },



  deletePOI: {
    validate: {
      payload: {
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
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
        const name = collection.name;
        const category = collection.category;
        const description = collection.description;
        console.log("test POI update "+id);
        // console.log("test 2");
        const record = await POI.findById(id);
        console.log("Name: "+collection.name);
        record.name = name;
        record.category = category;
        record.description = description;
        await record.delete();
        return h.view("home", { title: "Testing", id: id, name: name, category: category, description: description });
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

};

module.exports = Pois;
