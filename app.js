// add methods from express
const express = require("express");
const noteRouter = require("./routes/noteRoutes");

const app = express();

// middleware for post request - add the body to the request object
app.use(express.json());

// mounting a new router
app.use("/api/notes", noteRouter);

// create user middleware
app.use((req, res, next) => {
  console.log("Hello from the middleware 😂");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT} ...`);
});
