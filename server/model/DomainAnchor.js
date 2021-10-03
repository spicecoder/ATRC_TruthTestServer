const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DomainAnchor = new Schema({
  anchor: {
    type: String,
    required: true,
  },
});
DomainAnchor.index({ anchor: 1 }, { unique: true });
module.exports = mongoose.model("DomainAnchor", DomainAnchor);
