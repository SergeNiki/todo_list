import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthUserStore from './store/AuthUserStore';
import TaskListStore from './store/TaskListStore';
import UsersStore from './store/UsersStore';
import TaskDataStore from './store/TaskDataStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
    value={{
      authUserStore: new AuthUserStore(),
      usersStore: new UsersStore(),
      taskListStore: new TaskListStore(),
      taskDataStore: new TaskDataStore(),
    }}>
    <App />
  </Context.Provider>
);
