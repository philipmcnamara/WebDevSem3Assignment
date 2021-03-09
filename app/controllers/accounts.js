"use strict";
const User = require("../models/user");
const Admin = require("../models/admin");
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");

const Accounts = {
  index: {
    auth: false,
    handler: function(request, h) {
      return h.view("main", { title: "Welcome to Clare" });
    }
  },
  showSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view("signup", { title: "Sign up" });
    }
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
        const newUser = new User({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
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
    handler: function(request, h) {
      return h.view("login", { title: "Login" });
    }
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
        user.comparePassword(password);
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/home");
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  logout: {
    handler: function(request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    }
  },
  showSettings: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        return h.view("settings", { title: "Settings", user: user });
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    }
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
        user.password = userEdit.password;
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

};


module.exports = Accounts;
