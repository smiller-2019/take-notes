const fs = require("fs");
//convert to an array of javascript objects
const notes = JSON.parse(fs.readFileSync(`${__dirname}/../db/db.json`));

// get all notes
exports.getAllNotes = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    staus: "Success",
    requestedAt: req.requestTime,
    results: notes.length,
    data: { notes },
  });
};

// get a note for a specified id
exports.getNote = (req, res) => {
  console.log(req.params);
  // convert id to a number by multiplying by 1
  const id = req.params.id * 1;

  // iterate through the array to find element that is equal to the id and matches the id
  const note = notes.find((el) => el.id === id);

  // if note does not exist then return fail message
  if (!note) {
    return res.status(404).json({ staus: "fail", message: "Invalid ID" });
  }

  res.status(200).json({
    status: "Sucess",
    data: {
      note,
    },
  });
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
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    res.status(201).json({
      status: "Succes",
      data: {
        note: newNote,
      },
    });
  });
};
// delete a note for a specified id
exports.deleteNote = (req, res) => {
  // check the note exists before deleting
  if (req.params.id * 1 > notes.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  // note exists, delete a note
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
