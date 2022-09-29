const { roles } = require('./../../data');

exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('patronymic');
    table.string('login').notNullable();
    table.string('password').notNullable();
    table
      .enu('role', ['админ', 'руководитель', 'подчинённый'])
      .defaultTo(roles.SUBORDINATE);
    table
      .integer('supervisor_id')
      .references('id')
      .inTable('user')
      .onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
