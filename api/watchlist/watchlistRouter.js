const express = require('express');
const authRequired = require('../middleware/authRequired');
const validateUserId = require('../middleware/validate-user-id');

const Watchlist = require('./watchlist-bridgesModel');
const { removeWatchlist, findWatchlist } = require('./watchlist-bridgesModel');
const router = express.Router();

// HTTP GET to retrieve the authenticated user's watchlist

router.get('/:id', authRequired, function (req, res) {
  const id = String(req.params.id);
  Watchlist.findWatchlist(id)
    .then((list) => {
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ error: 'Watchlist Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// HTTP POST to create a new watchlist for a user

router.post('/:id', authRequired, validateUserId, async function (req, res) {
  const notes = String(req.body.notes);
  const user = String(req.params.id);
  const locations = req.body.locations;
  const title = String(req.body.title);

  try {
    // this profile does not have a watchlist, add it
    const createdList = await Watchlist.addWatchlist(
      title,
      user,
      notes,
      locations
    );
    return res
      .status(200)
      .json({ message: 'watchlist created', watchlist: createdList });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// HTTP PUT to modify a user's watchlist

router.put('/:id', authRequired, validateUserId, async function (req, res) {
  const id = String(req.params.id);
  const changes = {
    notes: req.body.notes,
    profile_id: id,
    title: req.body.title,
  };

  try {
    await Watchlist.updateWatchlist(id, changes);
  } catch (err) {
    res.status(500).json({ error: err });
  }

  const updatedList = await findWatchlist(id);
  res.status(200).json({ message: updatedList });
});

router.put('/bridge/:id', authRequired, validateUserId, async function (
  req,
  res
) {
  const id = String(req.params.id);
  const bridge = req.body.bridge;

  try {
    await Watchlist.addBridge(id, bridge);
  } catch (err) {
    res.status(500).json({ error: err });
  }

  const updatedList = await findWatchlist(id);
  res.status(200).json({ message: updatedList });
});

// HTTP DELETE to remove a bridge from the user's watchlist

router.delete('/bridge/:id', authRequired, validateUserId, async function (
  req,
  res
) {
  const id = String(req.params.id);
  const bridge = req.body.bridge;

  try {
    await removeWatchlist(id, bridge);
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
