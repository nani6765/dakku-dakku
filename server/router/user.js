const router = require("express").Router();
const { Counter } = require("../Model/counter.js");
const { User } = require("../Model/user.js");

const middlewares = require("../util/middlewares.js");

/**
 * @swagger
 * /api/user/register:
 *  post:
 *    tags: [user]
 *    summary: 회원가입
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - uid
 *            - email
 *            - displayName
 *          properties:
 *            uid:
 *              type: string
 *            email:
 *              type: string
 *            displayName:
 *              type: string
 *    responses:
 *      200:
 *        description: Request Success
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *            msg:
 *              type: string
 *              example: 회원가입이 성공했습니다.
 *      400:
 *        description: Request Error
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              example: false
 *            msg:
 *              type: string
 *              example: 필요한 정보가 없습니다.
 *      401:
 *        description: Request Email Error
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              example: false
 *            msg:
 *              type: string
 *              example: 중복된 email이 있습니다.
 *      402:
 *        description: Server Error
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              example: false
 *            msg:
 *              type: string
 *              example: Server Error Msg
 */
router.post("/register", middlewares.emailCheck, (req, res) => {
  if (!req.body.uid || !req.body.displayName)
    return res
      .status(400)
      .json({ success: false, msg: "필요한 정보가 없습니다." });

  let userData = {
    uid: req.body.uid,
    email: req.body.email,
    displayName: req.body.displayName,
  };

  let NewUser = new User(userData);
  NewUser.save()
    .then(() => {
      Counter.findOneAndUpdate({ name: "counter" }, { $inc: { userNum: 1 } })
        .exec()
        .then(() => {
          return res
            .status(200)
            .json({ success: true, msg: "회원가입이 성공했습니다." });
        });
    })
    .catch((err) => {
      return res.status(402).json({ success: false, err });
    });
});

module.exports = router;
