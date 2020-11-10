const db = require('../../data/db-config');

module.exports = {
  getNotes,
  addNotes,
  updateNotes,
  removeNotes,
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

function removeNotes(id) {
  return db('notes').where({ 'notes.id': id }).del();
}
