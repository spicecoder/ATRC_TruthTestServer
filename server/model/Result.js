const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Result = new Schema({
  msid: {
    type: String,
    required: true,
  },
  resolution: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  expected: {
    type: Array,
    default: [],
  },
  received: {
    type: Array,
    default: [],
  },
  owner: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Result", Result);
