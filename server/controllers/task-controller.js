const { roles } = require('../data');
const taskDAO = require('./../DAO/task-dao');
const userDAO = require('./../DAO/user-dao');
const dayjs = require('dayjs');

const fullNameUser = (user) => {
  return `${user.last_name} ${user.first_name} ${
    user.patronymic ? user.patronymic : ''
  }`;
};

class TaskController {
  getUserTasks = async (req, res) => {
    try {
      const { id, role } = req.user;
      const { responsible_id } = req.query;
      let userTasks = [];
      if (responsible_id) {
        userTasks = await taskDAO.getUserTasks(id, responsible_id);
        const userResponsible = await userDAO.findUser({ id: responsible_id });
        if (!userResponsible) {
          return res
            .status(404)
            .json({ message: 'Ответственный пользователь не найден' });
        }
        userTasks.forEach((task) => {
          delete task.responsible_id;
          task.responsibleName = fullNameUser(userResponsible);
          return task;
        });
      } else {
        userTasks = await taskDAO.getUserTasks(id);
      }

      if (role === roles.SUBORDINATE) {
        const user = await userDAO.findUser({ id: id });
        userTasks.forEach((task) => {
          delete task.responsible_id;
          task.responsibleName = fullNameUser(user);
          return task;
        });
      } else if (!responsible_id) {
        const users = await userDAO.getUsers();
        userTasks.forEach((task) => {
          const respUser = users.find(
            (user) => user.id === task.responsible_id
          );
          delete task.responsible_id;
          task.responsibleName = fullNameUser(respUser);
          return task;
        });
      }

      res.json(userTasks);
    } catch (error) {
      res.status(400).json({ message: 'Error' });
      console.log(error);
    }
  };

  async getTaskData(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({ message: 'Не был передан параметр id' });
      }
      const task = await taskDAO.getTaskData(id);
      if (!task) {
        return res.status(404).json({ message: 'Задача не найдена' });
      }
      const userCreator = await userDAO.findUser({ id: task.creator_id });
      const userResponsible = await userDAO.findUser({
        id: task.responsible_id,
      });
      delete task.creator_id;
      delete task.responsible_id;
      task.creator = fullNameUser(userCreator);
      task.responsible = fullNameUser(userResponsible);
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: 'Error' });
    }
  }

  async createTask(req, res) {
    try {
      const { id } = req.user;
      const {
        title,
        description,
        expiration_date,
        priority,
        status,
        responsible_id,
      } = req.body;
      if (!title || !description || !expiration_date || !priority || !status) {
        return res.status(400).json('Переданны не все данные о задаче');
      }
      const taskData = {
        title,
        description,
        expiration_date,
        create_date: dayjs(),
        update_date: dayjs(),
        priority,
        status,
        creator_id: id,
        responsible_id: responsible_id ? responsible_id : id,
      };
      const taskTitle = await taskDAO.createTask(taskData);
      res.json({
        message: 'Задача успешно создана и добавлена в список задач',
      });
    } catch (error) {
      res.status(400).json({ message: 'Error' });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.body;
      const authUserId = req.user.id;
      const task = await taskDAO.getTaskData(id);
      if (!task) {
        return res.status(404).json({ message: 'Задача не найдена' });
      }
      delete task.id;
      delete task.creator_id;
      for (let key in task) {
        if (!req.body[key] || req.body[key] === task[key]) {
          delete task[key];
        } else {
          task[key] = req.body[key];
        }
      }
      task.update_date = dayjs();
      const newTaskData = await taskDAO.updateTask(id, task);

      const userResponsible = await userDAO.findUser({
        id: newTaskData.responsible_id,
      });
      const userCreator = await userDAO.findUser({ id: authUserId });

      delete newTaskData.creator_id;
      delete newTaskData.responsible_id;
      newTaskData.creator = fullNameUser(userCreator);
      newTaskData.responsible = fullNameUser(userResponsible);

      res.json(newTaskData);
    } catch (error) {
      res.status(400).json({ message: 'Error' });
    }
  }
}

module.exports = new TaskController();
