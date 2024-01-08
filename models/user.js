const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("users", schema);

module.exports = User;
