const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load Hirer model
const Hirer = require("../models/hirer.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

// @route POST hirers/register
// @desc Register hirer
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Hirer.findOne({ phone: req.body.phone }).then((hirer) => {
    if (hirer) {
      return res.status(400).json({ phone: "Phone already exists" });
    } else {
      const newHirer = new Hirer({
        name: req.body.name,
        phone: req.body.phone,
        area: req.body.area,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newHirer.password, salt, (err, hash) => {
          if (err) throw err;
          newHirer.password = hash;
          newHirer
            .save()
            .then((hirer) => res.json(hirer))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST hirers/login
// @desc Login hirer and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const phone = req.body.phone;
  const password = req.body.password;
  // Find hirer by phone
  Hirer.findOne({ phone }).then((hirer) => {
    // Check if hirer exists
    if (!hirer) {
      return res.status(404).json({ phonenotfound: "Phone not found" });
    }
    // Check password
    bcrypt.compare(password, hirer.password).then((isMatch) => {
      if (isMatch) {
        // Hirer matched
        // Create JWT Payload
        console.log(hirer);
        const payload = {
          id: hirer.id,
          name: hirer.name,
          phone: hirer.phone,
          area: hirer.area,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    Hirer.findOne({ email: req.body.email })
      .then((user) => {
        console.log(user);
        if (!user) {
          return res
            .status(422)
            .json({ error: "No User exist with that phone" });
        }
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user
          .save()
          .then((result) => {
            transporter.sendMail({
              to: result.email,
              from: "akalankadewmith@gmail.com",
              subject: "Reset Your Password",
              html: `
          <h1>Hello, ${user.name}...Click the below <a href="http://localhost:3000/reset2/${token}">link</a> to reset password</h1>
          <p>If you did not click the reset password just ignore this email</p>
          `,
            });
            res.json({ message: "Check Your email" });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});

router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  Hirer.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try Again, session expired" });
      }
      bcrypt.hash(newPassword, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((savedUser) => {
          res.json({ message: "Password Updated" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  Hirer.findById(req.params.id)
    .populate("hired")
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Hirer not found" + err));
});

router.put("/edit/:id", (req, res) => {
  Hirer.findById(req.params.id)
    .then((user) => {
      user = _.extend(user, req.body);
      user.save((err) => {
        if (err) {
          return res.status(400).json({
            error: "Not Authorized",
          });
        }
        res.json({ user });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get("/my-hired-jobs/:id", (req, res) => {
//   Work.find({ _id : req.params.id })
//     .populate("postedBy", "_id name")
//     .sort("_created")
//     .exec((err, works) => {
//       if (err) {
//         return res.status(400).json({
//           error: err,
//         });
//       }
//       res.json(works);
//     });
// });

module.exports = router;
