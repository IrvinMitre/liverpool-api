const express = require("express");
const app = express();

app.get("/", (_req, res) => {
  res.send("Hello Liverpool Team!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
