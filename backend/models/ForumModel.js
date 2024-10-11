const mongoose = require("mongoose");

const forumShema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Forum", forumShema);
