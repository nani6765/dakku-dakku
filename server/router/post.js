const router = require("express").Router();
const { Counter } = require("../Model/counter.js");
const { Post } = require("../Model/post.js");

const middlewares = require("../util/middlewares.js");
const getter = require("../util/getter.js");

/**
 * @swagger
  /users/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - name: userId
          in: path
          required: true
          description: The ID of the user to return.
          schema:
            type: integer
            format: int64
            minimum: 1
      responses:
        '200':
          description: A user object.
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                    format: int64
                    example: 4
                  name:
                    type: string
                    example: Jessica Smith
        '400':
          description: The specified user ID is invalid (not a number).
        '404':
          description: A user with the specified ID was not found.
        default:
          description: Unexpected error
 */

router.post("/", (req, res) => {
  Post.find({})
    .exec()
    .then((postList) => {
      return res.status(200).json({
        success: true,
        postList,
      });
    })
    .catch((err) => {
      return res.status(200).json({
        success: false,
        postList: [],
        msg: err,
      });
    });
});

router.post("/submit", middlewares.loginCheck, (req, res) => {
  let userId = getter.getUserIdByUid(req.body.uid);
  if (
    userId.id ||
    req.body.email ||
    req.body.mainText ||
    req.body.tagList ||
    req.body.public
  )
    return res
      .status(400)
      .json({ success: false, msg: "필요한 항목이 없습니다." });

  let postInfo = {
    email: req.body.email,
    mainText: req.body.mainText,
    tagList: req.body.tagList,
    public: req.body.public,
    author: userId.id,
  };

  Counter.findOne({ name: "counter" }).then((counterDoc) => {
    postInfo.postNum = +counterDoc.postNum;
    const newPost = new Post(postInfo);
    newPost
      .save()
      .then(() => {
        counterDoc
          .updateOne({ $inc: { userNum: 1 } })
          .exec()
          .then(() => {
            return res.status(200).json({ success: true });
          });
      })
      .catch((err) => {
        return res.status(200).json({ success: false, msg: err });
      });
  });
});

router.post("/detail", (req, res) => {
  if (req.body.postNum)
    return res
      .status(400)
      .json({ success: false, msg: "필요한 정보가 없습니다." });

  Post.findOne({ postNum: +req.body.postNum })
    .exec()
    .then((postDoc) => {
      if (!postDoc) {
        return res.status(400).json({
          success: false,
          msg: "해당되는 게시글이 없습니다.",
        });
      } else {
        return res.status(200).json({
          success: true,
          postInfo,
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        msg: err,
      });
    });
});

module.exports = router;
