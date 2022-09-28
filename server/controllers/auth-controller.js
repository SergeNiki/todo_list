const userDAO = require('./../DAO/user-dao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateAccessToken = (id, login, role) => {
  return jwt.sign(
    {
      id,
      login,
      role,
    },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

class AuthController {
  login = async (req, res) => {
    try {
      const { login, password } = req.body;
      const user = await userDAO.findUser({ login: login });
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Некорректный логин или пароль' });
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ message: 'Некорректный логин или пароль' });
      }
      const token = generateAccessToken(user.id, user.login, user.role);
      res.json({ token: token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  };

  registration = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const { login, password } = req.body;
      const condidate = await userDAO.findUser({ login: login });
      if (condidate) {
        return res.status(409).json({
          message: `Пользователь с логином '${login}' уже существует`,
        });
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        patronymic: req.body?.patronymic,
        login,
        password: hashPassword,
        role: req.body?.role,
        supervisor_id: req.body?.supervisor_id,
      };
      const userLogin = await userDAO.createUser(userData);
      if (!userLogin) {
        return res.status(500);
      }
      res.json({ message: `Пользователь ${userLogin} успешно создан` });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  };

  authMe = async (req, res) => {
    try {
      const { id } = req.user;
      const userData = await userDAO.findUser({ id: id });
      if (!userData) {
        return res.status(400).json({ message: 'Пользователь не авторизован' });
      }
      delete userData.password;
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  };
}

module.exports = new AuthController();
