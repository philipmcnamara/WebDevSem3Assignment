"use strict";
const Donation = require("../models/donation");
const User = require("../models/user");
const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");


const Donations = {
  home: {
    handler: function(request, h) {
      return h.view("home", { title: "Make a Donation" });
    }
  },
  report: {
    handler: async function(request, h) {
      const donations = await Donation.find().populate("donor").lean();
      return h.view("report", {
        title: "Donations to Date",
        donations: donations
      });
    }
  },
  donate: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const newDonation = new Donation({
          amount: data.amount,
          method: data.method,
          description: data.description,
          donor: user._id
        });
        await newDonation.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  },

  /*showPOI: {
    handler: function(request, h) {
      return h.view('displayPOI', { title: 'Add POI' });
    }
  },
  POI: {
    auth: false,
    handler: async function(request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        user.comparePassword(password);
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/displayPOI");
      } catch (err) {
        return h.view("displayPOI", { errors: [{ message: err.message }] });
      }
    }
  },*/

  showPOI: {
    handler: async function(request, h) {
      try {

        //   const id = "604e1eb649b5eb23f0022b9a";

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
        //amount: Joi.string().required(),
        //method: Joi.string().required(),
        //description: Joi.string().required(),
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
        // request.cookieAuth.set({ _id: collection.id });
        console.log("test POI "+id);
        // console.log("test 2");
        const donation = await Donation.findById(id);
        const method = donation.method;
        const amount = donation.amount;
        const description = donation.description;



        //  camount = "test amount";//collection.amount;
        //  donation.method = "test method";//collection.method;
        //  donation.description = "test description";//collection.description;
        return h.view("displayPOI", { title: "Testing", id: id, method: method, amount: amount, description: description });
        // return h.redirect("/displayPOI",{id:id});
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  UpdatePOI: {
    validate: {
      payload: {
        amount: Joi.string().required(),
        method: Joi.string().required(),
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
        const method = collection.method;
        const amount = collection.amount;
        const description = collection.description;

        // request.cookieAuth.set({ _id: collection.id });
        console.log("test POI update "+id);
        // console.log("test 2");
        const record = await Donation.findById(id);
        console.log("Method: "+collection.method);
        record.method = method;
        record.amount = amount;
        record.description = description;
        await record.save();


        // console.log("Method: "+method);
        //  camount = "test amount";//collection.amount;
        //  donation.method = "test method";//collection.method;
        //  donation.description = "test description";//collection.description;
        return h.view("displayPOI", { title: "Testing", id: id, method: method, amount: amount, description: description });
        // return h.redirect("/displayPOI",{id:id});
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },


};

module.exports = Donations;
