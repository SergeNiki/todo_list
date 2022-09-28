const Router = require('express');
const router = new Router();
const authController = require('./../controllers/auth-controller');
const { check } = require('express-validator');
const authenticateToken = require('./../middleware/authMiddleware');

router.get('/me', authenticateToken, authController.authMe);
router.post('/login', authController.login);
router.post(
  '/registration',
  [
    check('first_name', 'Имя пользователя не может быть пустым').notEmpty(),
    check('last_name', 'Фамилия пользователя не может быть пустым').notEmpty(),
    check('login', 'Логин должен содержать от 4 до 20 символов').isLength({
      min: 4,
      max: 20,
    }),
    check('password', 'Пароль должен содержать от 4 до 20 символов').isLength({
      min: 4,
      max: 20,
    }),
  ],
  authController.registration
);

module.exports = router;
