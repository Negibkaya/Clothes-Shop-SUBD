const ThemeModel = require("../models/ThemeModel");
const mongoose = require("mongoose");

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sqlite1.db");
const db1 = new sqlite3.Database("./2_lab_users.db");

module.exports.createTheme = async (req, res) => {
  const { forum_id, title, description, created_by } = req.body;

  const created_at = new Date();

  ThemeModel.create({
    forum_id: new mongoose.Types.ObjectId(forum_id),
    title,
    description,
    created_by: new mongoose.Types.ObjectId(created_by),
    created_at,
  })
    .then((data) => {
      console.log("Theme created...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};

module.exports.getAllTheme = async function (req, res) {
  const theme = await ThemeModel.find();
  res.send(theme);
};

module.exports.updateTheme = async (req, res) => {
  const { id } = req.params;
  const { forum_id, title, description, created_by, created_at } = req.body;

  ThemeModel.findByIdAndUpdate(
    id,
    {
      forum_id: new mongoose.Types.ObjectId(forum_id),
      title,
      description,
      created_by: new mongoose.Types.ObjectId(created_by),
      created_at,
    },
    { new: true }
  )
    .then((data) => {
      console.log("Topic updated...");
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};

module.exports.deleteTheme = async function (req, res) {
  const { id } = req.params;

  ThemeModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Delete theme...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};
