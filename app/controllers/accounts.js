"use strict";
const User = require("../models/user");
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");          // ADDED
const saltRounds = 10;                     // ADDED

const Accounts = {
  index: {
    auth: false,
    handler: function(request, h) {
      return h.view("main", { title: "Welcome to Clare" });
    }
  },
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Home" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup", { title: "Sign up for Donations" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("signup", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = "Email address is already registered";
          throw Boom.badData(message);
        }

        const hash = await bcrypt.hash(payload.password, saltRounds);    // ADDED

        const newUser = new User({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: hash                             // EDITED
        });
        user = await newUser.save();
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/home");
      } catch (err) {
        return h.view("signup", { errors: [{ message: err.message }] });
      }
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login", { title: "Login to Donations" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("login", {
            title: "Sign in error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        await user.comparePassword(password);           // EDITED
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/home");
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  showSettings: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        return h.view("settings", { title: "Donation Settings", user: user });
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  updateSettings: {
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("settings", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const userEdit = request.payload;
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        user.firstName = userEdit.firstName;
        user.lastName = userEdit.lastName;
        user.email = userEdit.email;
        user.password = userEdit.password;          // EXERCISE -- change this to use bcrypt
        await user.save();
        return h.redirect("/settings");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  showContact: {
    handler: function(request, h) {
      return h.view('ContactUs', { title: 'Find Us '});
    }
  },
  ContactUs: {
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
        return h.redirect("/ContactUs");
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    }
  },
  showAilwee: {
    handler: function(request, h) {
      return h.view('Ailwee', { title: 'Visit Clare' });
    }
  },
  Ailwee: {
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
        return h.redirect("/Ailwee");
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    }
  },
  showBunratty: {
    handler: function(request, h) {
      return h.view('bunratty', { title: 'Visit Clare' });
    }
  },
  Bunratty: {
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
        return h.redirect("/bunratty");
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    }
  },
  validate: {
    payload: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
    failAction: function (request, h, error) {
      return h
        .view("signup", {
          title: "Sign up error",
          errors: error.details,
        })
        .takeover()
        .code(400);
    },
  },

  showAdminSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view("adminSignup", { title: "Sign up" });
    }
  },

  adminSignup: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      failAction: function (request, h, error) {
        return h
          .view("adminSignup", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const payload = request.payload;
        let admin = await Admin.findByEmail(payload.email);
        if (admin) {
          const message = "Email address is already registered";
          throw Boom.badData(message);
        }
        const newAdmin = new Admin({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
        });
        admin = await newAdmin.save();
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/adminHome");
      } catch (err) {
        return h.view("adminSignup", { errors: [{ message: err.message }] });
      }
    },
  },

  showAdminLogin: {
    auth: false,
    handler: function(request, h) {
      return h.view("adminLogin", { title: "Login" });
    }
  },

  adminLogin: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("adminLogin", {
            title: "Sign in error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      try {
        let admin = await Admin.findByEmail(email);
        if (!admin) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        admin.comparePassword(password);
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/adminHome");
      } catch (err) {
        return h.view("adminLogin", { errors: [{ message: err.message }] });
      }
    },
  },
  showDoolin: {
    handler: function(request, h) {
      return h.view('folkFest', { title: 'Visit Clare' });
    }
  },
  Doolin: {
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
        return h.redirect("/folkFest");
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    }
  },
  showReport: {
    handler: function(request, h) {
      return h.view('report', { title: 'View Report' });
    }
  },
  report: {
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
        return h.redirect("/report");
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    }
  },
  showMap: {
    handler: function(request, h) {
      return h.view('map', { title: 'View Map' });
    }
  },
  map: {
    auth: false,
    handler: async function(request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        // The location of the cliffs
        const cliffs = { lat: 52.9715, lng: 9.4309 };
        // The map, centered at cliffs
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: cliffs,
        });
        // The marker, positioned at cliffs
        const marker = new google.maps.Marker({
          position: cliffs,
          map: map,
        });
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    }
  },

  showPOI: {
    handler: function(request, h) {
      return h.view('addPoi', { title: 'Add POI' });
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
        return h.redirect("/addPoi");
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    }
  },

  showDisplayPOI: {
    handler: function(request, h) {
      return h.view('displayPOI', { title: 'Visit Clare' });
    }
  },
  displayPOI: {
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
      }
      catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    }
  },

  authenticate: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function(request, h, error) {
        return h
          .view("login", {
            title: "Sign in error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        let userPassword = await User.findByPassword(password);
        let admin = await Admin.findByEmail(email);
        let adminPassword = await Admin.findByPassword(password);

        if (user && userPassword) {
          user.comparePassword(password);
          request.cookieAuth.set({ id: user.id });
          return h.redirect("/home")
      }
        else if (admin && adminPassword) {
          admin.comparePassword(password);
          request.cookieAuth.set({ id: admin.id });
          return h.redirect("/adminSettings");
        }
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },

  showAdminSettings: {
    handler: function(request, h) {
      return h.view('adminSettings', { title: 'View adminSettings' });
    }
  },
  adminSettings: {
    handler: async function(request, h) {
      const users = await User.find().populate("users").lean();
      return h.view("adminSettings", {
        title: "User's",
        users: users
      });
    }
  },


  deleteUser: {
    auth: false,
    validate: {
      payload: {
        id: Joi.string().id().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("adminSettings", {
            title: "Sign in error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const { id} = request.payload;
      try {
        let user = await User.findByIdAndDelete(id);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        request.cookieAuth.set({ id: user.id });
        await user.delete();
        return h.redirect("/adminSettings");
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    },
  },

};

module.exports = Accounts;
