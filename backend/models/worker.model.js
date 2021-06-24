const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const WorkerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  area: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  onGoingWorks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "works",
    },
  ],
  email: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  },
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
module.exports = Worker = mongoose.model("workers", WorkerSchema);
