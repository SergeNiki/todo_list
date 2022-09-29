const db = require('../db/db');

const selectValues = [
  'id',
  'title',
  'expiration_date',
  'priority',
  'status',
  'responsible_id',
];

class TaskDAO {
  createTask = async (taskData) => {
    const newTask = await db('task').insert(taskData).returning('title');
    return newTask[0].title;
  };

  getUserTasks = async (id, responsibleId) => {
    let tasks = [];
    if (!responsibleId) {
      tasks = await db('task')
        .select(selectValues)
        .where('creator_id', id)
        .orWhere('responsible_id', id)
        .orderBy('update_date', 'desc');
    } else {
      tasks = await db('task')
        .select(selectValues)
        .where('creator_id', id)
        .andWhere('responsible_id', responsibleId)
        .orderBy('update_date', 'desc');
    }
    return tasks;
  };

  getTaskData = async (id) => {
    const task = await db('task').where('id', id);
    return task[0];
  };

  updateTask = async (id, taskData) => {
    const task = await db('task')
      .where('id', id)
      .update(taskData)
      .returning('*');
    return task[0];
  };
}

module.exports = new TaskDAO();
