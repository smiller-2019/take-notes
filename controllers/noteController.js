const fs = require("fs");
//convert to an array of javascript objects
const notes = JSON.parse(fs.readFileSync("./db/db.json"));

console.log("isArray:" + Array.isArray(notes));

exports.checkID = (req, res, next, val) => {
  console.log(`Notes id is: ${val}`);
  console.log("length is " + notes.length);
  // check the note exists before deleting
  if (req.params.id * 1 > notes.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

// check title or text in note is not missing
exports.checkBody = (req, res, next) => {
  if (!req.body.title || !req.body.text) {
    return res.status(400).json({
      status: "fail",
      message: "Missing title or text",
    });
  }
  next();
};

// get all notes
exports.getAllNotes = (req, res) => {
  console.log("getAllNotes isArray:" + Array.isArray(notes));
  console.log(req.requestTime);
  res.json(notes);
};

// get a note for a specified id
exports.getNote = (req, res) => {
  console.log(req.params);
  // convert id to a number by multiplying by 1
  const id = req.params.id * 1;

  // iterate through the array to find element that is equal to the id and matches the id
  const note = notes.find((el) => el.id === id);

  res.json(note);
};

// create a note with a new id
exports.createNote = (req, res) => {
  // create a new id for the notes
  const newId = notes[notes.length - 1].id + 1;
  console.log(notes.length);
  // merge the new note object to the request body (note from the client)
  const newNote = Object.assign({ id: newId }, req.body);
  // add the new notes to the array
  notes.push(newNote);
  console.log("createNote isArray:" + Array.isArray(notes));
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    res.json(newNote);
  });
};
// delete a note for a specified id
exports.deleteNote = (req, res) => {
  console.log(req.params);
  // convert id to a number by multiplying by 1
  const id = req.params.id * 1;

  // iterate through the array to find element that is equal to the id and matches the id
  const note = notes.find((el) => el.id === id);

  let index = notes.indexOf(note);
  notes.splice(index, 1);
  console.log("deleting note");
  console.log(notes);
  fs.writeFile("./../db/db.json", JSON.stringify(notes), (err) => {
    res.json(note);
  });
};
