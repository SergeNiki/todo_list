const Router = require('express');
const router = new Router();
const taskController = require('../controllers/task-controller');
const authenticateToken = require('./../middleware/authMiddleware');

router.get('/task', authenticateToken, taskController.getUserTasks);
router.get('/task/:id', authenticateToken, taskController.getTaskData);
router.post('/task', authenticateToken, taskController.createTask);
router.put('/task', authenticateToken, taskController.updateTask);

module.exports = router;
