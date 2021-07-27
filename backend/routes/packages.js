const express = require("express");
const router = express.Router();

const pdf = require("html-pdf");

const Package = require("../models/package.model");

const packageInvoice = require("../documents/package-invoice");

router.post("/add", (req, res) => {
  newPackage = new Package({
    title: req.body.title,
    type: req.body.type,
    area: req.body.area,
    discount: req.body.discount,
    count: req.body.count,
    rating: req.body.rating,
    masonry: req.body.masonry,
    carpentry: req.body.carpentry,
    house_wiring: req.body.house_wiring,
    plumber: req.body.plumber,
    painting: req.body.painting,
  });

  newPackage
    .save()
    .then(() => res.json("Package Added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.get("/all", (req, res) => {
  Package.find()
    .then((package) => {
      res.json(package);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
  Package.findById(req.params.id)
    .populate({
      path: "masonry",
      populate: { path: "postedBy" },
    })
    .populate({
      path: "carpentry",
      populate: { path: "postedBy" },
    })
    .populate({
      path: "house_wiring",
      populate: { path: "postedBy" },
    })
    .populate({
      path: "plumber",
      populate: { path: "postedBy" },
    })
    .populate({
      path: "painting",
      populate: { path: "postedBy" },
    })
    .then((package) => {
      res.json(package);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.put("/like", (req, res) => {
  let like = req.body;
  like.postedBy = req.body.hirerId;
  Package.findByIdAndUpdate(
    req.body.packageId,
    { $push: { likes: like } },
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
  Package.findByIdAndUpdate(
    req.body.packageId,
    { $pull: { likes: { postedBy: req.body.hirerId } } },
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
  let comment = req.body.comment;
  comment.postedBy = req.body.hirerId;
  Package.findByIdAndUpdate(
    req.body.packageId,
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
  Package.findByIdAndUpdate(
    req.body.packageId,
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

//POST - Pdf generation and fetching data//
router.post("/create-invoice", (req, res) => {
  pdf.create(packageInvoice(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});
//GET - Send genrated pdf to client
// router.get("/fetch-pdf", (req, res) => {
//   res.sendFile(`${__dirname}/result.pdf`);
// });

module.exports = router;
