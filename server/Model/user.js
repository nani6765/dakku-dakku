const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    displayName: {
      type: String,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);
module.exports = { User };
