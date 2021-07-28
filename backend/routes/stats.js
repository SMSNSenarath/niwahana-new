const express = require("express");
const router = express.Router();

const Work = require("../models/work.model");
const Hirer = require("../models/hirer.model");
const Worker = require("../models/worker.model");
const Package = require("../models/package.model");

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

router.get("/latest-comments/:id", (req, res) => {
  // Work.aggregate([
  //   { $match: { postedBy: ObjectId(req.params.id) } },
  //   {
  //     $group: { _id: "$comments._id", comments: "$comments" },
  //   },
  // ]).then((result) => {
  //   res.json(result);
  // });

  Work.find({ postedBy: req.params.id })
    .select("comments")
    .populate("comments comments.postedBy")
    .sort("_comments.created")
    .exec((err, works) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(works);
    });
});

router.get("/top-work/:id", (req, res) => {
  Work.aggregate([
    { $match: { postedBy: ObjectId(req.params.id) } },
    { $unwind: "$comments" },
    {
      $group: {
        _id: "$_id",
        maxWork: { $max: { $size: "$likes" } },
      },
    },
    {
      $sort: { maxWork: -1 },
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

router.get("/monthly/work-likes/:id", (req, res) => {
  Work.aggregate([
    { $match: { postedBy: ObjectId(req.params.id) } },
    { $unwind: "$comments" },
    { $sort: { created: 1 } },
    {
      $group: {
        _id: { title: "$title", month: { $month: "$comments.created" } },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.title",
        comment: { $push: { month: "$_id.month", count: "$count" } },
      },
    },
  ]).then((result) => {
    res.json(result);
  });
});

router.get("/highest-normal-package", (req, res) => {
  Package.find({ type: "Normal" })
    .sort({ count: -1 })
    .limit(1)
    .then((result) => {
      res.json(result);
    });
});

router.get("/highest-elite-package", (req, res) => {
  Package.find({ type: "Elite" })
    .sort({ count: -1 })
    .limit(1)
    .then((result) => {
      res.json(result);
    });
});

router.get("/highest-premium-package", (req, res) => {
  Package.find({ type: "Premium" })
    .sort({ count: -1 })
    .limit(1)
    .then((result) => {
      res.json(result);
    });
});

router.get("/lowest-normal-package", (req, res) => {
  Package.find({ type: "Normal" })
    .sort({ count: 1 })
    .limit(1)
    .then((result) => {
      res.json(result);
    });
});

router.get("/lowest-elite-package", (req, res) => {
  Package.find({ type: "Elite" })
    .sort({ count: 1 })
    .limit(1)
    .then((result) => {
      res.json(result);
    });
});

router.get("/lowest-premium-package", (req, res) => {
  Package.find({ type: "Premium" })
    .sort({ count: 1 })
    .limit(1)
    .then((result) => {
      res.json(result);
    });
});

router.get("/highest-premium/graph/:id", (req, res) => {
  Package.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    { $unwind: "$likes" },
    {
      $group: {
        _id: { title: "$title", month: { $month: "$ikes.created" } },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.title",
        likes: { $push: { month: "$_id.month", count: "$count" } },
      },
    },
  ]);
});

module.exports = router;
