const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema(
  {
    forum_id: {
      type: mongoose.Schema.Types.ObjectId, // referencing Forum's ObjectId
      ref: "ForumModel", // referencing Forum model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId, // referencing User's ObjectId
      ref: "UserModel", // referencing User model
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Theme", ThemeSchema);
