const express = require('express');

const Notes = require('./notesModel.js');

const router = express.Router();

router.get('/notes', (req, res) => {
  Notes.getNotes()
    .then((notes) => res.status(200).json(notes))
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post('/notes', (req, res) => {
  const notesData = req.body;
  Notes.addNotes(notesData)
    .then((newNote) => res.status(201).json(newNote))
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.put('/notes/:id', (req, res) => {
  const change = req.body;
  Notes.updateNotes(req.params.id, change)
    .then((update) => {
      res.status(200).json(update);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete('/notes/:id', (req, res) => {
  Notes.removeNotes(req.params.id)
    .then((note) => {
      res.status(204).json(error);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
