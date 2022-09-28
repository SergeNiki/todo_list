const db = require('./../db/db');

class UserDAO {
  createUser = async (userData) => {
    const user = await db('user')
      .insert({ ...userData })
      .returning('login');
    return user[0].login;
  };

  findUser = async (criterion) => {
    const user = await db('user').where(criterion);
    return (
      user.length &&
      user.reduce((target, key) => {
        target[key] = key;
        return target;
      })
    );
  };

  getUsers = async (criterion) => {
    const users = criterion
      ? await db('user').where(criterion)
      : await db('user');
    return users;
  };
}

module.exports = new UserDAO();
