const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Context = new Schema({
  domain: {
    type: String,
    required: true,
  },
  flow: {
    type: String,
    required: true,
  },
  atttentionentities: {
    type: Array,
    default: [],
  },
  owner: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Context", Context);
