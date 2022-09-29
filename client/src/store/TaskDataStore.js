import taskAPI from '../http/taskAPI';

const { makeAutoObservable } = require('mobx');

let initialStore = {
  id: null,
  title: '',
  description: '',
  expiration_date: null,
  create_date: null,
  update_date: null,
  priority: '',
  status: '',
  creator: '',
  responsible: '',
};

export default class TaskDataStore {
  constructor() {
    this._taskData = initialStore;
    this._isFetching = false;
    this._successMessage = '';
    makeAutoObservable(this);
  }

  setTaskData = async (id) => {
    this._isFetching = true;
    try {
      const response = await taskAPI.getTaskData(id);
      this._taskData = response.data;
      this._isFetching = false;
    } catch (error) {
      console.log(error);
      this._isFetching = false;
    }
  };

  createTask = async (taskData, closeForm) => {
    this._isFetching = true;
    try {
      const response = await taskAPI.createTask(taskData);
      this._successMessage = response.data.message;
      this._isFetching = false;
      closeForm();
    } catch (error) {
      console.log(error);
      this._isFetching = false;
    }
  };

  updateTask = async (taskData) => {
    this._isFetching = true;
    try {
      const response = await taskAPI.updateTaskData(taskData);
      this._taskData = response.data;
      this._isFetching = false;
    } catch (error) {
      console.log(error);
      this._isFetching = false;
    }
  };

  clearStore = () => {
    this._taskData = initialStore;
    this._isFetching = false;
    this._successMessage = '';
  };

  get taskData() {
    return this._taskData;
  }
  get isFetching() {
    return this._isFetching;
  }
}
