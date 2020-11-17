exports.up = function (knex) {
  return knex.schema
    .createTable('watchlist', (list) => {
      list.increments();
      list.string('list_title', 50);
      list
        .string('profile_id')
        .references('id')
        .inTable('profiles')
        .unique()
        .notNullable();
      list.text('notes', 255);
    })
    .createTable('watchlist_bridges', (bridge) => {
      bridge.increments();
      bridge
        .string('project')
        .references('project_code')
        .inTable('bridges')
        .notNullable();
      bridge
        .string('list_id')
        .references('profile_id')
        .inTable('watchlist')
        .notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('watchlist_bridges')
    .dropTableIfExists('watchlist');
};
