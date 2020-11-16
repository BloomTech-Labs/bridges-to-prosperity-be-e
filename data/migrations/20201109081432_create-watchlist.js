exports.up = function (knex) {
  return knex.schema
    .createTable('watchlist', (list) => {
      list.increments().primary();
      list.string('list_title', 50);
      list.string('profile_id').references('id').inTable('profiles').unique();
      list.text('notes', 255);
    })
    .createTable('watchlist_bridges', (bridge) => {
      bridge.increments().primary();
      bridge
        .string('project')
        .unsigned()
        .references('project_code')
        .inTable('bridges');
      bridge
        .integer('list_id')
        .unsigned()
        .references('id')
        .inTable('watchlist');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('watchlist_bridges')
    .dropTableIfExists('watchlist');
};
