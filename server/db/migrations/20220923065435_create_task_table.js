const { taskStatus, taskPriority } = require('./../../data');

exports.up = function (knex) {
  return knex.schema.createTable('task', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.date('expiration_date').defaultTo(knex.fn.now());
    table.date('create_date').defaultTo(knex.fn.now());
    table.date('update_date').defaultTo(knex.fn.now());
    table
      .enu('priority', ['высокий', 'средний', 'низкий'])
      .defaultTo(taskPriority.MEDIUM);
    table
      .enu('status', ['к выполнению', 'выполняется', 'выполнена', 'отменена'])
      .defaultTo(taskStatus.TO_FULFILLMENT);
    table
      .integer('creator_id')
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
    table
      .integer('responsible_id')
      .references('id')
      .inTable('user')
      .onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('task');
};
