const { Schema, model } = require("mongoose");

const ipsums = new Schema({
  quote: { type: String, required: true },
  character: { type: String, required: true },
  NSFW: { type: Boolean, required: true }
});

module.exports = model("Ipsums", ipsums);
