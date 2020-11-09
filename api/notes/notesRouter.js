const express = require('express');

const Notes = require('./notesModel.js');

const router = express.Router();

router.get('/notes', (req, res) => {
  Notes.getNotes()
    .then((notes) => res.status(200).json(notes))
    .catch((error) => {
      res.status(500).json(error, { message: 'There was an error finding the notes' });
    });
});

router.post('/notes', (req, res) => {
  const notesData = req.body;
  Notes.addNotes(notesData)
    .then((newNote) => res.status(201).json(newNote))
    .catch((error) => {
      res.status(500).json(error, { message: 'Note could not be created' });
    });
});

router.put('/notes/:id', (req, res) => {
  const change = req.body;
  Notes.updateNotes(req.params.id, change)
    .then((update) => {
      res.status(200).json(update);
    })
    .catch((error) => {
      res.status(500).json(error, { message: 'Note could not be updated' });
    });
});

router.delete('/notes/:id', (req, res) => {
  Notes.removeNotes(req.params.id)
    .then((note) => {
      res.status(204).json({ message: `${note} was successfully deleted.` });
    })
    .catch((error) => {
      res.status(500).json(error, { message: 'There was an error deleting the note' });
    });
});

module.exports = router;
