const User = require("../Model/user.js");

module.exports = {
  getUserIdByUid: function (uid) {
    User.findOne({ uid: uid })
      .exec()
      .then((userDoc) => {
        if (!userDoc) return { success: false, msg: "유저가 없습니다." };
        else return { success: true, id: userDoc._id };
      })
      .catch((err) => {
        return { success: false, msg: err };
      });
  },
};
