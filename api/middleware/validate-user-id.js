const { restart } = require('nodemon');
const { findById } = require('../profile/profileModel');

module.exports = {
  validateUserId,
};

function validateUserId(req, res, next) {
  const id = req.params.id;
  findById(id).then((profile) => {
    if (profile) {
      next();
    } else {
      restart.status(404).json({ error: 'ProfileNotFound' });
    }
  });
}
