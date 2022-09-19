const express = require("express");

const app = express();

app.use(express.static("public"));

// GET Route for homepage
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);
