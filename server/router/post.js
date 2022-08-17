const router = require("express").Router();
const { Counter } = require("../Model/counter.js");
const { Post } = require("../Model/post.js");

const middlewares = require("../util/middlewares.js");
const getter = require("../util/getter.js");

/**
 * @swagger
 * /api/post/:
 *  post:
 *    tags: [post]
 *    summary: 게시글 목록 가져오기
 *    consumes:
 *      - application/json
 *    responses:
 *      200:
 *        description: Request Success
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              example: true
 *            postList:
 *              type: array
 *              description: postDoc List
 *              items:
 *                type: object
 *      400:
 *        description: Server Error
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              example: false
 *            postList:
 *              type: array
 *              items:
 *                type: object
 *                example:
 *            msg:
 *              type: string
 *              example: Server Error Msg
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
      return res.status(400).json({
        success: false,
        postList: [null],
        msg: err,
      });
    });
});

/**
 * @swagger
 * /api/post/submit:
 *  post:
 *    tags: [post]
 *    summary: 게시글 등록하기
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - uid
 *            - email
 *            - mainText
 *            - tagList
 *            - public
 *          properties:
 *            uid:
 *              type: string
 *            email:
 *              type: string
 *            mainText:
 *              type: string
 *            tagList:
 *              type: array
 *              items:
 *                type: string
 *            public:
 *              type: boolean
 *    responses:
 *      200:
 *        description: Request Success
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
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
 *              example: 로그인이 필요한 기능입니다.
 *      401:
 *        description: Request Error
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              example: false
 *            msg:
 *              type: string
 *              example: 필요한 항목이 없습니다.
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
router.post("/submit", middlewares.loginCheck, (req, res) => {
  console.log(req.body)
  let userId = getter.getUserIdByUid(req.body.uid);
  if (
    userId.id == false ||
    req.body.email == false ||
    req.body.mainText == false ||
    req.body.tagList == false ||
    req.body.public == undefined
  )
    return res
      .status(401)
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
        return res.status(402).json({ success: false, msg: err });
      });
  });
});

/**
 * @swagger
 * /api/post/detail:
 *  post:
 *    tags: [post]
 *    summary: 게시글 불러오기
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - postNum
 *          properties:
 *            postNum:
 *              type: integer

 *    responses:
 *      200:
 *        description: Request Success
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *            postInfo:
 *              type: object
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
 *        description: DataBase Error
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: boolean
 *              example: false
 *            msg:
 *              type: string
 *              example: 해당되는 게시글이 없습니다.
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
router.post("/detail", (req, res) => {
  if (!req.body.postNum)
    return res
      .status(400)
      .json({ success: false, msg: "필요한 정보가 없습니다." });

  Post.findOne({ postNum: +req.body.postNum })
    .exec()
    .then((postDoc) => {
      
      if (!postDoc) {
        return res.status(401).json({
          success: false,
          msg: "해당되는 게시글이 없습니다.",
        });
      } else {

        return res.status(200).json({
          success: true,
          postInfo
          // postDoc,
        });
      }
    })
    .catch((err) => {
      return res.status(402).json({
        success: false,
        msg: err,
      });
    });
});

module.exports = router;
