const db = require('../../data/db-config');

async function findWatchlist(id) {
  let list = await db('watchlist').where('profile_id', id);
  const bridges = await findBridges(id);
  list = {
    ...list[0],
    locations: bridges,
  };

  return list;
}

async function findBridges(id) {
  let bridge_array = [];
  const bridges = await db('watchlist_bridges')
    .where('list_id', id)
    .select('project');

  bridges.forEach((bridge) => {
    bridge_array.push(bridge.project);
  });

  return bridge_array;
}

const addWatchlist = async (title, profile_id, notes, bridge_array) => {
  try {
    await db('watchlist').insert({
      title,
      profile_id,
      notes,
    });
    // Bridge_array is an array of bridges - mapping through the array
    bridge_array.forEach(async (bridge) => {
      addBridge(profile_id, bridge);
    });

    return findWatchlist(profile_id);
  } catch (err) {
    return err;
  }
};

async function updateWatchlist(id, change) {
  return await db('watchlist').where('profile_id', id).update(change);
}

async function addBridge(id, bridge) {
  return await db('watchlist_bridges').insert({
    project: String(bridge),
    list_id: id,
  });
}

async function removeWatchlist(id, bridge) {
  return await db('watchlist_bridges')
    .where('list_id', id)
    .andWhere('project', String(bridge))
    .del();
}

module.exports = {
  findWatchlist,
  findBridges,
  addWatchlist,
  updateWatchlist,
  addBridge,
  removeWatchlist,
};
