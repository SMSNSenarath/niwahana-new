const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Hirer = mongoose.model("hirers");
const keys = require("../config/keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Hirer.findById(jwt_payload.id)
        .then((hirer) => {
          if (hirer) {
            return done(null, hirer);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
