const mongoose = require("mongoose");
/*
1. firebase에 email이랑, password를 보내여. createUserWithEmailAndPassword
2. updateProfile로 닉네임(displayName) 설정
3. createdUser.user.uid, email, displayName 서버로 보낸다.
*/
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
