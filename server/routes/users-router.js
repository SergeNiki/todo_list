const Router = require('express');
const router = new Router();
const usersController = require('./../controllers/users-controller');
const authenticateToken = require('./../middleware/authMiddleware');

router.get('/users', authenticateToken, usersController.getUsers);

module.exports = router;
