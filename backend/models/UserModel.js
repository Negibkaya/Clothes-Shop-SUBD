const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  gender: {
    type: String,
    require: true,
  },
  FIO: {
    type: String,
    require: true,
  },
  date_birth: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
