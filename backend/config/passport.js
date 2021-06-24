const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Worker = mongoose.model("workers");
const keys = require("../config/keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Worker.findById(jwt_payload.id)
        .then((worker) => {
          if (worker) {
            return done(null, worker);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
