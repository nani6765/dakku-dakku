const mongoose = require("mongoose");

//email : String
//mainText : String
//tagList: Array
//public : Boolean

const postSchema = mongoose.Schema(
  {
    mainText: String,
    postNum: {
      type: Number,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      //required: true,
    },
    imageList: Array, //String,
    tagList: Array,
    likeNum: {
      type: Number,
      default: 0,
    },
    commentNum: {
      type: Number,
      default: 0,
    },
    public: Boolean,
  },
  // createdAt, updateaAt
  { timestamps: true, collection: "posts" }
);

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };