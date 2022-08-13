const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/server/dist")));
app.use(cors());

/* routing */
app.use("/api/user", require("./server/router/user.js"));
app.use("/api/post", require("./server/router/post.js"));

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "/server/dist/index.html"));
});

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "/server/dist/index.html"));
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connecting...");
    app.listen(PORT, () => {
      console.log(`Server Running... ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
