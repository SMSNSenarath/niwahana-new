const express = require("express");
const router = express.Router();

const Work = require("../models/work.model");
const Hirer = require("../models/hirer.model");
const Worker = require("../models/worker.model");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.get("/total-likes/:id", (req, res) => {
  Work.aggregate([
    { $match: { postedBy: ObjectId(req.params.id) } },
    { $group: { _id: "$likes", Count: { $sum: 1 } } },
  ]).then((result) => {
    res.json(result);
  });
});

router.get("/total-comments/:id", (req, res) => {
  Work.aggregate([
    { $match: { postedBy: ObjectId(req.params.id) } },
    {
      $group: { _id: "$comments._id", Count: { $sum: { $size: "$comments" } } },
    },
  ]).then((result) => {
    res.json(result);
  });
});

// router.get("/view", (req, res) => {
//   Work.find()
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
