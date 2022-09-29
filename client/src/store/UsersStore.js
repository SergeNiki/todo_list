import { makeAutoObservable } from 'mobx';
import usersAPI from './../http/usersAPI';

export default class UsersStore {
  constructor() {
    this._users = [];
    this._isFetching = false;
    makeAutoObservable(this);
  }

  setUsers = async (usersType) => {
    this._isFetching = true;
    try {
      const response = await usersAPI.getUsers(usersType);
      this._users = response.data;
      this._isFetching = false;
    } catch (error) {
      console.log(error);
      this._isFetching = false;
    }
  };

  get usersList() {
    return this._users;
  }
  get isFetching() {
    return this._isFetching;
  }
}
