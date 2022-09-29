import $api from '.';

const taskAPI = {
  getTaskList: async (responsible_id) => {
    const url = responsible_id
      ? `/task?responsible_id=${responsible_id}`
      : '/task';
    return $api.get(url);
  },

  getTaskData: async (id) => {
    return $api.get(`/task/${id}`);
  },

  createTask: async (taskData) => {
    return $api.post('/task', taskData);
  },

  updateTaskData: async (taskData) => {
    return $api.put('/task', taskData);
  },
};

export default taskAPI;
