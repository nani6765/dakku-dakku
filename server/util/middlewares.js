const { User } = require("../Model/user.js");

module.exports = {
  loginCheck: function (req, res, next) {
    if (!req.body.uid)
      return res
        .status(400)
        .json({ success: false, msg: "로그인이 필요한 기능입니다." });
    else next();
  },

  emailCheck: function (req, res, next) {
    if (!req.body.email)
      return res
        .status(400)
        .json({ success: false, msg: "필요한 정보가 없습니다." });

    User.find({ email: req.body.email })
      .exec()
      .then((docs) => {
        if (docs)
          return res
            .status(401)
            .json({ success: false, msg: "중복된 email이 있습니다." });
        else next();
      })
      .catch((err) => {
        return res.status(402).json({ success: false, err });
      });
  },
};
