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
      bridges.string('bridge_site_name');
      bridges.string('project_stage');
      bridges.string('sub_stage');
      bridges.string('project_code').unique();
      bridges.string('bridge_type');
      bridges.string('span');
      bridges.float('lat');
      bridges.float('long');
      bridges.string('individuals_directly_served');
      bridges.specificType('communities_served', 'text ARRAY');
      bridges.string('form_name');
      bridges.string('casesafeid_form');
      bridges.string('bridge_opportunity_id');
      bridges.string('bridge_image');
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('bridges');
  return knex.schema.dropTableIfExists('profiles');
};
