const ForumModel = require("../models/ForumModel");

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sqlite1.db");
const db1 = new sqlite3.Database("./2_lab_users.db");

module.exports.getForum = async (req, res) => {
  const forum = await ForumModel.find();
  res.send(forum);
};

module.exports.saveForum = async (req, res) => {
  const { name, description } = req.body;

  ForumModel.create({ name, description })
    .then((data) => {
      console.log("Save forum...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};

module.exports.updateForum = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  ForumModel.findByIdAndUpdate(id, { name, description })
    .then(() => {
      res.send("Update forum...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};

module.exports.deleteForum = async (req, res) => {
  const { id } = req.params;

  ForumModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Delete forum...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong" });
    });
};
