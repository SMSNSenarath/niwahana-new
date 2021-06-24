const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const HirerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  hired: [
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
});
module.exports = Hirer = mongoose.model("hirers", HirerSchema);
