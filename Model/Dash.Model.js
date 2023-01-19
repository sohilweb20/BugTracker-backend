const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  taskname: String,
});

const Usermodel = mongoose.model("DashUser", userSchema);

module.exports = { Usermodel };
