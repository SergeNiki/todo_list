const Router = require('express');
const router = new Router();
const taskController = require('../controllers/task-controller');
const authenticateToken = require('./../middleware/authMiddleware');

router.get('/', authenticateToken, taskController.getUserTasks);
router.get('/:id', authenticateToken, taskController.getTaskData);
router.post('/', authenticateToken, taskController.createTask);
router.put('/', authenticateToken, taskController.updateTask);

module.exports = router;
