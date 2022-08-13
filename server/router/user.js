const router = require("express").Router();
const { Counter } = require("../Model/counter.js");
const { User } = require("../Model/user.js");

const emailCheck = (req, res, next) => {
  if (!req.body.email)
    return res
      .status(400)
      .json({ success: false, msg: "필요한 항목의 값이 비어있습니다." });

  User.find({ email: userData.email })
    .exec()
    .then((docs) => {
      if (docs)
        return res
          .status(400)
          .json({ success: false, msg: "중복된 email이 있습니다." });
      else next();
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
};

router.post("/register", emailCheck, (req, res) => {
  if (!req.body.uid || !req.body.displayName)
    return res
      .status(400)
      .json({ success: false, msg: "필요한 항목의 값이 비어있습니다." });

  let userData = {
    uid: req.body.uid,
    email: req.body.email,
    displayName: req.body.displayName,
  };

  let NewUser = new User(userData);
  NewUser.save()
    .then(() => {
      Counter.findOneAndUpdate({ userNum: { $inc: 1 } })
        .exec()
        .then(() => {
          return res
            .status(200)
            .json({ success: true, msg: "회원가입이 성공했습니다." });
        });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, err });
    });
});

module.exports = router;
