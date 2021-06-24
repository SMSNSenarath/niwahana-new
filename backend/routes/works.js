const express = require("express");
const router = express.Router();

const Work = require("../models/work.model");
const Hirer = require("../models/hirer.model");
const Worker = require("../models/worker.model");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/add", upload.array("images"), (req, res) => {
  console.log(req.files); // Problem - This is an object array, i should take the 'path' and assign it to the images[] below

  const image1 = req.files[0].path;
  const image2 = req.files[1].path;
  const image3 = req.files[2].path;

  const newWork = new Work({
    title: req.body.title,
    fee: req.body.fee,
    category: req.body.category,
    area: req.body.area,
    images: [image1, image2, image3],
    postedBy: req.body.postedBy,
  });

  newWork
    .save()
    .then(() => res.json("Work Added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/").get((req, res) => {
  Work.find()
    .populate("postedBy", "_id name phone")
    .select("")
    .then((works) => {
      res.json(works);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
  Work.findById(req.params.id)
    .populate("postedBy", "_id name phone")
    .select("")
    .then((work) => res.json(work))
    .catch((err) => res.status(400).json("Work not found" + err));
});

router.get("/my-posts/:id", (req, res) => {
  Work.find({ postedBy: req.params.id })
    .populate("postedBy", "_id name")
    .sort("_created")
    .exec((err, works) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(works);
    });
});

router.put("/purchase/", (req, res) => {
  console.log(req.params.id);
  Hirer.findByIdAndUpdate(
    req.body.hirerId,
    {
      $push: { hired: req.body.workId },
    },
    { new: true },
    (err) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      Worker.findByIdAndUpdate(
        req.body.workerId,
        {
          $push: { onGoingWorks: req.body.workId },
        },
        { new: true }
      )
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

// router.put("/purchase", (req, res) => {
//   console.log(req.body.workId);
//   Hirer.findByIdAndUpdate(
//     req.body.workId,
//     { $push: { hired: req.body.workId } },
//     { new: true }
//   ).exec((err, result) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     } else {
//       res.json(result);
//     }
//   });
// });

router.put("/like", (req, res) => {
  Work.findByIdAndUpdate(
    req.body.workId,
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
  Work.findByIdAndUpdate(
    req.body.workId,
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

  Work.findByIdAndUpdate(
    req.body.workId,
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

  Work.findByIdAndUpdate(
    req.body.workId,
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

router.post("/search-works-area", (req, res) => {
  let workPattern = new RegExp(req.body.query);
  Work.find({ area: { $regex: workPattern } })
    .then((work) => {
      res.json({ work });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/search-works-category", (req, res) => {
  let workPattern = new RegExp(req.body.query);
  Work.find({ category: { $regex: workPattern } })
    .then((work) => {
      res.json({ work });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/search-works-category", (req, res) => {
  let workPattern = new RegExp(req.body.query);
  Work.find({ category: { $regex: workPattern } })
    .then((work) => {
      res.json({ work });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/area", (req, res) => {
  Work.find({ area: req.body.area })
    .populate("postedBy", "")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
