import { makeAutoObservable } from 'mobx';
import userAuthAPI from '../http/authAPI';

export default class AuthUserStore {
  constructor() {
    this._isAuth = false;
    this._isFetching = false;
    this._userData = {};
    this._errorMessage = '';
    this._successMessage = '';
    makeAutoObservable(this);
  }

  authMe = async () => {
    this._isFetching = true;
    try {
      if (localStorage.getItem('token')) {
        const response = await userAuthAPI.authMe();
        this._userData = response.data;
        this._isAuth = true;
      }
      this._isFetching = false;
    } catch (error) {
      console.log(error);
      this.logout();
    }
  };

  login = async (login, password) => {
    this._isFetching = true;
    try {
      const response = await userAuthAPI.login(login, password);
      localStorage.setItem('token', response.data.token);
      this._isFetching = false;
      this._errorMessage = '';
      await this.authMe();
    } catch (error) {
      console.log(error);
      this._errorMessage = error.response.data.message;
      this._isFetching = false;
    }
  };

  registration = async (userData) => {
    this._isFetching = true;
    this.clearMessages();
    try {
      const response = await userAuthAPI.registration(userData);
      this._isFetching = false;
      this._successMessage = response.data.message;
    } catch (error) {
      console.log(error);
      this._errorMessage = error.response.data.message;
      this._isFetching = false;
    }
  };

  logout = () => {
    localStorage.clear();
    this._isAuth = false;
    this._userData = {};
  };

  clearMessages() {
    this._errorMessage = '';
    this._successMessage = '';
  }

  get isAuth() {
    return this._isAuth;
  }
  get isFetching() {
    return this._isFetching;
  }
  get userData() {
    return this._userData;
  }
  get errorMessage() {
    return this._errorMessage;
  }
  get successMessage() {
    return this._successMessage;
  }
}
