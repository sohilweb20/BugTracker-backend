const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const { connection } = require("./config/db");
const { Authmodel } = require("./Model/Auth.model");

require("dotenv").config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("<h1>WELCOME SOHIL IN THE  MOCK 11</h1> ");
});

app.get("/about", (req, res) => {
  res.send("<h4>welcome SOHIL in the about page</h4> ");
});

//signiup

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  const userPresent = await Authmodel.findOne({ email });

  if (userPresent?.email) {
    res.send("Try loggin in, user is already exist");
  } else {
    try {
      bcrypt.hash(password, 5, async function (err, hash) {
        const user = new Authmodel({ email, password: hash });
        await user.save();
        res.send({
          message: "Sign up successfull",
          status: "Ok",
        });
      });
    } catch (err) {
      console.log(err);
      res.send({
        ERR: "Something went wrong in signup the data . please try again later",
      });
    }
  }
});

//login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Authmodel.find({ email });

    if (user.length > 0) {
      const hashed_password = user[0].password;
      bcrypt.compare(password, hashed_password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "hush");
          res.send({ msg: "Login successfull", token: token });
        } else {
          res.send("Login failed");
        }
      });
    } else {
      res.send("Login failed");
    }
  } catch {
    res.send("Something went wrong, please try again later");
  }
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log(err);
    console.log({ err: "Something went wrong in running server" });
  }
  console.log("server running on port 8082");
});
