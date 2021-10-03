const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Domain = new Schema({
  domainanchor: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Domain", Domain);
