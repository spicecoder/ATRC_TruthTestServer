const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DomainAnchor = new Schema({
  anchor: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("DomainAnchor", DomainAnchor);
