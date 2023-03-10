const express = require("express");

const userRouter = express.Router();
const { Usermodel } = require("../Model/Dash.Model");

userRouter.get("/", async (req, res) => {
  try {
    const userData = await Usermodel.find();
    res.send(userData);
  } catch (err) {
    console.log({ ERR: "Something went wrong in getting the Data" });
  }
});

userRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_data = new Usermodel(payload);
    await new_data.save();
    res.send({ MSG: "User Data Posted Successfully" });
  } catch (err) {
    console.log({ ERR: "Something went wrong in posting the Data" });
  }
});

userRouter.delete("/delete/:userID", async (req, res) => {
  const userID = req.params.userID;
  try {
    await Usermodel.findByIdAndDelete({ _id: userID });
    res.send({ MSG: "User Data Deleted Successfully" });
  } catch (err) {
    console.log({ ERR: "Something went wrong in posting the Data" });
  }
});

module.exports = { userRouter };
