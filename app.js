const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(express.static(path.join(__dirname, "/server/dist")));

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "/server/dist/index.html"));
});

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "/server/dist/index.html"));
});

app.listen(PORT, (req, res) => {
  console.log(`Server Running... ${PORT}`);
});
