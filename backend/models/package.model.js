const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PackageSchema = new Schema({
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  area: {
    type: String,
  },
  discount: {
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  count: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  masonry: {
    type: Schema.Types.ObjectId,
    ref: "works",
  },
  carpentry: {
    type: Schema.Types.ObjectId,
    ref: "works",
  },
  house_wiring: {
    type: Schema.Types.ObjectId,
    ref: "works",
  },
  plumber: {
    type: Schema.Types.ObjectId,
    ref: "works",
  },
  painting: {
    type: Schema.Types.ObjectId,
    ref: "works",
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "hirers",
    },
  ],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: Schema.Types.ObjectId, ref: "hirers" },
    },
  ],
});

module.exports = mongoose.model("Package", PackageSchema);
