const express = require('express');

const Notes = require('./notesModel.js');

const router = express.Router();

router.get('/notes', (req, res) => {
  Notes.getNotes()
    .then((notes) => res.status(200).json(notes))
    .catch((error) => {
      res.status(500).json({ message: 'There was an error finding the notes' }, error);
    });
});

router.post('/notes', (req, res) => {
  const notesData = req.body;
  Notes.addNotes(notesData)
    .then((newNote) => res.status(201).json(newNote))
    .catch((error) => {
      res.status(500).json({ message: 'Note could not be created' }, error);
    });
});

router.put('/notes/:id', (req, res) => {
  const change = req.body;
  Notes.updateNotes(req.params.id, change)
    .then((update) => {
      res.status(200).json(update);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Note could not be updated' }, error);
    });
});

router.delete('/notes/:id', (req, res) => {
  Notes.removeNotes(req.params.id)
    .then((note) => {
      res.status(204).json({ message: `${note} was successfully deleted.` }, error);
    })
    .catch((error) => {
      res.status(500).json({ message: 'There was an error deleting the note' }, error);
    });
});

module.exports = router;
