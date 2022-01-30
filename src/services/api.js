  

import axios from 'axios';

import { getToken } from './auth';

const api = axios.create({
   baseURL: 'https://api-novamusic.herokuapp.com/',
});

api.interceptors.request.use(async config => {
   const token = getToken();
   console.log(config, token);
   
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

export default api;