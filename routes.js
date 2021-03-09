"use strict";

const Accounts = require("./app/controllers/accounts");
const Donations = require("./app/controllers/donations");

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },
  { method: 'GET', path: '/ContactUs', config: Accounts.showContact },
  { method: 'POST', path: '/ContactUs', config: Accounts.ContactUs },
  { method: 'GET', path: '/Ailwee', config: Accounts.showAilwee },
  { method: 'POST', path: '/Ailwee', config: Accounts.Ailwee },
  { method: 'GET', path: '/bunratty', config: Accounts.showBunratty },
  { method: 'POST', path: '/bunratty', config: Accounts.Bunratty },

  { method: "GET", path: "/adminSignup", config: Accounts.showAdminSignup },
  { method: "GET", path: "/adminLogin", config: Accounts.showAdminLogin },
  { method: "POST", path: "/adminSignup", config: Accounts.adminSignup },
  { method: "POST", path: "/adminLogin", config: Accounts.adminLogin },


  { method: "GET", path: "/home", config: Donations.home },
  { method: "POST", path: "/donate", config: Donations.donate },
  { method: "GET", path: "/report", config: Donations.report },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
];
