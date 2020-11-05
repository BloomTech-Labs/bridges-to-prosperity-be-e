const express = require('express');
const authRequired = require('../middleware/authRequired');
const validateUserId = require('../middleware/validate-user-id');
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

router.post(':/id', authRequired, validateUserId, async function (req, res) {
  const id = String(req.params.id);
  const newList = {
    notes: req.body.notes,
    user: id,
    locations: req.body.locations,
  };
  if (id) {
    try {
      const list = await Watchlist.findById(id);
      if (list == undefined) {
        // this profile does not have a watchlist, add it
        const createdList = await Watchlist.create(newList);
        return res
          .status(200)
          .json({ message: 'watchlist created', watchlist: createdList[0] });
      } else {
        res
          .status(400)
          .json({ error: 'Watchlist for this user already exists' });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
});
