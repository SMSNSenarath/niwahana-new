const express = require("express");
const router = express.Router();

const Package = require("../models/package.model");

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

module.exports = router;
