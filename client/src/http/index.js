import axios from 'axios';

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Token ${localStorage.getItem('token')}`;
  }
  return config;
});

export default $api;
