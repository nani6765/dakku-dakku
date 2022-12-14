const mongoose = require("mongoose");
const counter = mongoose.Schema(
  {
    name: {
      type: String,
    },
    userNum: {
      type: Number,
    },
    postNum: {
      type: Number,
    },
  },
  { collection: "counter" }
);

const Counter = mongoose.model("Counter", counter);
module.exports = { Counter };
