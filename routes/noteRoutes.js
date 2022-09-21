const express = require("express");
const noteController = require("./../controllers/noteController");

// create new router to allow routes to be placed in separate file
const router = express.Router();

// middleware to get notes id
router.param("id", noteController.checkID);

// seperate the route from the handlers using app.route and . notation
// get all notes from using the route handler
// create a new note
router
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.checkBody, noteController.createNote);
// get a specifed note using the id
// delete a specified note using the id
router
  .route("/:id")
  .get(noteController.getNote)
  .delete(noteController.deleteNote);

module.exports = router;
