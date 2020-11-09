const db = require('../../data/db-config');

module.exports = {
  getNotes,
  addNotes,
  updateNotes,
};

function getNotes() {
  return db('notes');
}

function addNotes(note) {
  return db('notes')
    .join('watchlist')
    .insert({ ...note });
}

function updateNotes(id, change) {
  return db('notes').where({ 'notes.id': id }).update(change);
}
