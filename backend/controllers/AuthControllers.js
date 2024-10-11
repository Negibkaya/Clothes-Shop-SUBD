const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sqlite1.db");
const db1 = new sqlite3.Database("./2_lab_users.db");

module.exports.register = async (req, res) => {
  const { phone, email, gender, FIO, date_birth, password, role } = req.body;

  const isUsedEmail = await UserModel.findOne({ email });

  if (isUsedEmail) {
    console.log("Used email...");
    return res.status(402).send({ error: "Used email" });
  }

  const isUsedPhone = await UserModel.findOne({ phone });

  if (isUsedPhone) {
    console.log("Used phone...");
    return res.status(402).send({ error: "Used phone" });
  }

  UserModel.create({ phone, email, gender, FIO, date_birth, password, role })
    .then((data) => {
      console.log("Register completed...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    console.log("User not found...");
    return res.status(404).send({ error: "User not found" });
  }

  if (user.password !== password) {
    console.log("Wrong password...");
    return res.status(401).send({ error: "Wrong password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  console.log("Login completed...");
  res.status(200).send(token);
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { phone, email, gender, FIO, date_birth, password, role } = req.body;

  UserModel.findByIdAndUpdate(id, {
    phone,
    email,
    gender,
    FIO,
    date_birth,
    password,
    role,
  })
    .then((data) => {
      // res.status(200).send(data);
      res.send("Update User...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  UserModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Delete User...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};
