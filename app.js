// add methods from express
const express = require("express");
const noteRouter = require("./routes/noteRoutes");
const htmlRouter = require("./routes/htmlRoutes");

const app = express();

// middleware for post request - add the body to the request object
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mounting a new router
app.use("/api/notes", noteRouter);
app.use("/", htmlRouter);

module.exports = app;
