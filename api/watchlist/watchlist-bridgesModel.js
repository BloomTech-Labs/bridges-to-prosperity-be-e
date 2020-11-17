const db = require('../../data/db-config');

async function findWatchlist(id) {
  let list = await db('watchlist').where('profile_id', id);
  const bridges = await db('watchlist_bridges')
    .where('list_id', id)
    .select('project');
  console.log('list: ', list, 'bridges', bridges);
  list = {
    ...list[0],
    locations: [],
  };

  bridges.map((bridge) => {
    list.locations.push(bridge.project);
  });
  return list;
}

const addWatchlist = async (list_title, profile_id, notes, bridge_array) => {
  console.log(list_title, profile_id, notes, bridge_array);
  try {
    await db('watchlist').insert({
      list_title,
      profile_id,
      notes,
    });
    // Bridge_array is an array of bridges - mapping through the array
    bridge_array.forEach(async (bridge) => {
      await db('watchlist_bridges').insert({
        project: String(bridge),
        list_id: profile_id,
      });
    });

    return findWatchlist(profile_id);
  } catch (err) {
    return err;
  }
};

async function updateWatchlist(id, change) {
  const { locations, ...rest } = change;
  console.log('locations: ', locations, 'rest: ', rest);
  // try {
  //   await db('watchlist').where({ 'watchlist.profile_id': id }).update(rest);
  // } catch (err) {
  //   return err;
  // }
  try {
    const bridge_list = await db('watchlist_bridges').where('list_id', id);
    console.log(bridge_list);
  } catch (err) {
    return err;
  }

  return findWatchlist(id);
}

function removeWatchlist(user_id, bridge_id) {
  return db('watchlist_bridges')
    .where({
      list_id: user_id,
      project: bridge_id,
    })
    .del();
}

module.exports = {
  findWatchlist,
  addWatchlist,
  updateWatchlist,
  removeWatchlist,
};
