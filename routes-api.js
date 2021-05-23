const Users = require("./app/api/users");
const POIs = require("./app/api/POIs");
const Reviews = require("./app/api/reviews");


module.exports = [
  { method: "GET", path: "/api/users", config: Users.find },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },

  { method: "GET", path: "/api/POIs", config: POIs.find },
  { method: "GET", path: "/api/POIs/{id}", config: POIs.findOne },
  { method: "POST", path: "/api/POIs", config: POIs.create },
  { method: "DELETE", path: "/api/POIs/{id}", config: POIs.deleteOne },
  { method: "DELETE", path: "/api/POIs", config: POIs.deleteAll },

  { method: "GET", path: "/api/reviews", config: Reviews.find },
  { method: "GET", path: "/api/reviews/{id}", config: Reviews.findOne },
  { method: "POST", path: "/api/reviews", config: Reviews.create },
  { method: "DELETE", path: "/api/reviews/{id}", config: Reviews.deleteOne },
  { method: "DELETE", path: "/api/reviews", config: Reviews.deleteAll },

];
