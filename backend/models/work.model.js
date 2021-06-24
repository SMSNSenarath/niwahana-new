const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  fee: {
    type: String,
  },
  area: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workers",
  },
  created: {
    type: Date,
    default: Date.now,
  },

  rating: {
    type: Number,
  },

  images: [
    {
      type: String,
    },
  ],

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hirers",
    },
  ],

  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "hirers" },
    },
  ],
});

module.exports = Work = mongoose.model("works", WorkSchema);
