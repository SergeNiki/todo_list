module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'todo_list_esoft',
      user: 'postgres',
      password: '123',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
