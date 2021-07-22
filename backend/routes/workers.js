const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load Worker model
const Worker = require("../models/worker.model");
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

// @route POST workers/register
// @desc Register Worker
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Worker.findOne({ phone: req.body.phone }).then((worker) => {
    if (worker) {
      return res.status(400).json({ phone: "Phone Number already exists" });
    } else {
      const newWorker = new Worker({
        name: req.body.name,
        phone: req.body.phone,
        area: req.body.area,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newWorker.password, salt, (err, hash) => {
          if (err) throw err;
          newWorker.password = hash;
          newWorker
            .save()
            .then((worker) => res.json(worker))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST workers/login
// @desc Login worker and return JWT token
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
  // Find worker by phone
  Worker.findOne({ phone }).then((worker) => {
    // Check if worker exists
    if (!worker) {
      return res
        .status(404)
        .json({ phonenotfound: "No Account exist for this Mobile" });
    }
    // Check password
    bcrypt.compare(password, worker.password).then((isMatch) => {
      if (isMatch) {
        // Worker matched
        // Create JWT Payload
        const payload = {
          id: worker.id,
          name: worker.name,
          phone: worker.phone,
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

router.get("/:id", (req, res) => {
  Worker.findById(req.params.id)
    .populate("onGoingWorks")
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("User not found" + err));
});

router.put("/edit/:id", (req, res) => {
  Worker.findById(req.params.id)
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

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    Worker.findOne({ email: req.body.email })
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
          <h1>Hello, ${user.name}...Click the below <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h1>
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
  console.log(req.body.token);
  Worker.findOne({
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

router.put("/like", (req, res) => {
  Worker.findByIdAndUpdate(
    req.body.workerId,
    { $push: { likes: req.body.hirerId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      res.json(result);
    }
  });
});

router.put("/unlike", (req, res) => {
  Worker.findByIdAndUpdate(
    req.body.workerId,
    { $pull: { likes: req.body.hirerId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      res.json(result);
    }
  });
});

router.put("/comment", (req, res) => {
  console.log(req.body.comment);
  console.log(req.body.hirerId);
  let comment = req.body.comment;
  comment.postedBy = req.body.hirerId;

  Worker.findByIdAndUpdate(
    req.body.workerId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments.postedBy", "")
    .populate("postedBy", "")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
});

router.put("/uncomment", (req, res) => {
  let comment = req.body.comment;

  Worker.findByIdAndUpdate(
    req.body.workerId,
    { $pull: { comments: { _id: comment._id } } },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        res.json(result);
      }
    });
});

router.post("/search-worker-name", (req, res) => {
  let workPattern = new RegExp(req.body.query);
  Worker.find({ name: { $regex: workPattern } })
    .then((work) => {
      res.json({ work });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
