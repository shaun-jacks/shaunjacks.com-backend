const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CommentSchema = new Schema(
  {
    userId: {
      type: String,
      default: "",
      required: [true]
    },
    name: {
      type: String,
      required: [true, "Must have name"]
    },
    slug: {
      type: String,
      required: [true, "Must have slug"]
    },
    body: {
      type: String,
      required: [true, "Must have text"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
