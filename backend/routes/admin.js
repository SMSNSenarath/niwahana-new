const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin",
  branding: {
    logo: "https://www.picturepaste.ca/images/2020/06/09/niwahanalogo2.png",
    companyName: "",
    softwareBrothers: false,
  },
});

const ADMIN = {
  username: "admin",
  password: "lovejs",
};

// const router = AdminBroExpress.buildRouter(adminBro);

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: "admin-bro",
  cookiePassword: "supersecret-and-long-password-for-a-cookie-in-the-browser",
  authenticate: async (username, password) => {
    if (username === ADMIN.username && password === ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
});

module.exports = router;
