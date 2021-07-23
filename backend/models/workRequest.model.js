const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkRequestSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "hirers",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "workers",
    },
    work: {
      type: Schema.Types.ObjectId,
      ref: "works",
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkRequest", WorkRequestSchema);
