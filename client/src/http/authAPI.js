import $api from './index';

const userAuthAPI = {
  authMe: async () => {
    return $api.get('/auth/me');
  },

  registration: async (userData) => {
    return $api.post('/auth/registration', userData);
  },

  login: async (login, password) => {
    return $api.post('/auth/login', { login, password });
  },
};

export default userAuthAPI
