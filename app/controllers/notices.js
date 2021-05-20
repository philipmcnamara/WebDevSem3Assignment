"use strict";
const User = require("../models/user");
const Joi = require("@hapi/joi");
const NOTICE = require("../models/notices");

const Notices = {

  home: {
    handler: function (request, h) {
      return h.view("notices", { title: "Notices" });
    },
  },


  report: {
    handler: async function (request, h) {
      const allNotices = await NOTICE.find().populate("notices").lean();
      let total = 0;
      allNotices.forEach((notice) => {
        total += notice.amount;
      });
      return h.view("notices", {
        title: "Donations to Date",
        notices: allNotices,
        total: total,
      });
    },
  },

  addNotice: {
    handler: async function(request, h) {
      try {
        console.log("TEST Notice");
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const newNotice = new NOTICE({
          notice: data.notice,
          date: data.date,
          notifier: user._id,
        });
        await newNotice.save();
        return h.redirect("/notices");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  },

};

module.exports = Notices;
