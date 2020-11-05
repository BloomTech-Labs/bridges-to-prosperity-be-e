const express = require('express');
const authRequired = require('../middleware/authRequired');
const Watchlist = require('./watchlistModel');
const router = express.Router();

// HTTP GET to retrieve the authenticated user's watchlist

router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Watchlist.findById(id)
    .then((list) => {
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ error: 'WatchlistNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// HTTP POST to create a new watchlist for a user

router.post(':/id', authRequired, async function (req, res) {
  const id = String(req.params.id)
  if (id) {
    try{
      const list = await Watchlist.findById(id)
      if (list == undefined) {
        
      }

    } catch (err) {
      res.status(500).json({ error: err })
    }
})