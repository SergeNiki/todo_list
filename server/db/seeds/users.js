const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  await knex('user').del();
  const hashPassword = await bcrypt.hashSync('admin', 5);
  await knex('user').insert([
    {
      id: 1,
      first_name: 'Sergey',
      last_name: 'Nikitenko',
      patronymic: null,
      login: 'admin',
      password: hashPassword,
      role: 'админ',
      supervisor_id: null,
    },
  ]);
};
