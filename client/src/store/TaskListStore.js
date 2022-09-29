import { makeAutoObservable } from 'mobx';
import taskAPI from '../http/taskAPI';

export default class TaskListStore {
  constructor() {
    this._taskList = [];
    this._isFetching = false;
    makeAutoObservable(this);
  }

  setTaskList = async (responsible_id) => {
    this._isFetching = true;
    try {
      const response = await taskAPI.getTaskList(responsible_id);
      this._taskList = response.data;
      this._isFetching = false;
    } catch (error) {
      console.log(error);
      this._isFetching = false;
    }
  };

  clearStore = () => {
    this._taskList = [];
    this._isFetching = false;
  };

  get taskList() {
    return this._taskList;
  }
}
