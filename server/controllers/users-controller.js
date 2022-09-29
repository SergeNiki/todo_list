const userDAO = require('./../DAO/user-dao');
const { roles } = require('./../data');

class UsersController {
  getUsers = async (req, res) => {
    try {
      const { role } = req.query;
      const { id } = req.user;
      let users = [];
      if (role === roles.SUPERVISOR) {
        users = await userDAO.getUsers({ role: role });
      } else if (role === roles.SUBORDINATE) {
        users = await userDAO.getUsers({ role: role, supervisor_id: id });
      } else {
        users = await userDAO.getUsers();
      }
      if (users.length) {
        users.forEach((user) => {
          delete user.password;
          return user;
        });
      }
      return res.json(users);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  };
}

module.exports = new UsersController();
