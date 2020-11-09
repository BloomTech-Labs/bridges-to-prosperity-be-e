
exports.up = function(knex) {
  return knex.schema
  .createTable('watchlist', list => {
    list.increments();
    list.string('list_title', 50).unique().notNullable();
    list.string('profile_id').unsigned().references('id').inTable('profiles');
    list.string('project').unsigned().references('project_code').inTable('bridges');
  })
  .createTable('notes', notes => {
    notes.increments();
    notes.text('notes', 255);
    notes.integer('watchlist_id').unsigned().references('id').inTable('watchlist')
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('notes')
    .dropTableIfExists('watchlist')
};
