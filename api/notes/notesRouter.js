const express = require('express');

const Notes = require('./notesModel.js');

const router = express.Router();

//get notes
router.get('/notes', (req, res, next) => {
  Notes.getNotes()
    .then((notes) => res.status(200).json(notes))
    .catch((error) => {
      console.log('error in Note Router GET', error);
      res.status(500).json({ message: 'There was an error finding the notes' });
    });
});

//add notes
router.post('/notes', (req, res, next) => {
  const notesData = req.body;
  Notes.addNotes(note)
    .then((newNote) => res.status(201).json(newNote))
    .catch((error) => {
      console.log('error in Note Router POST', error);
      res.status(500).json({ message: 'Note could not be created' });
    });
});

//update notes
router.put('/notes/:id', (req, res, next) => {
  const change = req.body
  Notes.updateNotes
});

//delete notes
router.delete('/notes/:id', (req, res, next) => {});

module.exports = router;
