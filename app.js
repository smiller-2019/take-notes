// add methods from express
const express = require("express");
const noteRouter = require("./routes/noteRoutes");

const app = express();

// middleware for post request - add the body to the request object
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// mounting a new router
app.use("/api/notes", noteRouter);

module.exports = app;
