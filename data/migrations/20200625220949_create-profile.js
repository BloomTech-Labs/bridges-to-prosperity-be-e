exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
    })

    .createTable('bridges', function (bridges) {
      bridges.increments();
      bridges.string('country');
      bridges.integer('district_id');
      bridges.string('province');
      bridges.string('district');
      bridges.string('sector');
      bridges.string('sector_id');
      bridges.string('cell');
      bridges.string('cell_id');
      bridges.string('village');
      bridges.string('village_id');
      bridges.string('name');
      bridges.string('stage');
      bridges.string('sub_stage');
      bridges.string('project_code').unique();
      bridges.string('type');
      bridges.string('span');
      bridges.float('Lat');
      bridges.float('Long');
      bridges.string('Individuals_directly_served');
      bridges.string('form');
      bridges.string('case_safe_id');
      bridges.string('opportunity_id');
      bridges.string('bridge_image');
      bridges.string('community_served_1');
      bridges.string('community_served_1_id');
      bridges.string('community_served_2');
      bridges.string('community_served_2_id');
      bridges.string('community_served_3');
      bridges.string('community_served_3_id');
      bridges.string('community_served_4');
      bridges.string('community_served_4_id');
      bridges.string('community_served_5');
      bridges.string('community_served_5_id');
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('bridges');
  return knex.schema.dropTableIfExists('profiles');
};
