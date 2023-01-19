const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  email: String,
  password: String,
});
const Authmodel = mongoose.model("Authdata", authSchema);

module.exports = { Authmodel };
