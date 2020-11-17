const express = require('express');
const authRequired = require('../middleware/authRequired');
const validateUserId = require('../middleware/validate-user-id');
const Watchlist = require('./watchlist-bridgesModel');
const { removeWatchlist } = require('./watchlist-bridgesModel');
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
  console.log(notes, user, locations, title);

  try {
    // const list = await Watchlist.findWatchlist(user);
    // if (list == []) {
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
    // } else {
    //   res.status(400).json({
    //     message: list,
    //     error: 'Watchlist for this user already exists',
    //   });
    // }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// HTTP PUT to modify a user's watchlist

router.put('/:id', authRequired, validateUserId, async function (req, res) {
  const id = String(req.params.id);
  const changes = {
    notes: req.body.notes,
    user: id,
    locations: req.body.locations,
    title: req.body.title,
  };
  try {
    const updatedList = await Watchlist.updateWatchlist(id, changes);
    res.status(200).json({ message: updatedList[0] });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// HTTP DELETE to remove a bridge from the user's watchlist

router.delete('/:id', authRequired, async function (req, res) {
  const id = String(req.params.id);
  const bridge = req.body.bridge;

  try {
    const deleted = await removeWatchlist(id, bridge);
    res.status(200).json({ message: deleted });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
