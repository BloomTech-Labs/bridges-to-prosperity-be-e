const db = require('../../data/db-config');

module.exports = {
  findWatchlist,
  addWatchlist,
  updateWatchlist,
  removeWatchlist,
};

function findWatchlist(id) {
  return db('watchlist').where({ profile_id: id }).join('watchlist_bridges');
}

async function addWatchlist(list_title, profile_id, notes, bridge_id) {
  const list = await db('watchlist').insert({ list_title, profile_id, notes });
  await db('watchlist_bridges').insert({ bridge_id, list_id: list.id });
  return findWatchlist(list.id);
}

function updateWatchlist(id, change) {
  return db('watchlist')
    .join('watchlist_bridges', 'watchlist.id', 'watchlist_bridges.list_id')
    .where({ 'watchlist.profile_id': id })
    .update(change);
}

function removeWatchlist(user_id, bridge_id) {
  return db('watchlist_bridges')
    .join('watchlist', 'watchlist_bridges.list_id', 'watchlist.id')
    .where({
      'watchlist.profile_id': user_id,
      'watchlist_bridges.project': bridge_id,
    })
    .del();
}
