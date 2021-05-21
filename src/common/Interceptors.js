import { apiConfig, api } from './Api';
import secureStore from './SecureStorageService';
import axios from 'axios';

apiConfig.axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    return new Promise(async (resolve, reject) => {
      const originalReq = err.config;

      if (err.response) {
        const isExpired = err.response.data.message?.indexOf('expired') > -1;
        
        if (err.response.status === 403 && isExpired && err.config && !err.config.__isRetryRequest) {
          originalReq._retry = true;
          const refreshToken = await secureStore.get({ service: 'refreshToken' });
          const response = await api.refreshToken(refreshToken);

          if (response.ok) {
            const { accessToken } = response.data;

            originalReq.headers.Authorization = `Bearer ${accessToken}`;
            secureStore.set('accessToken', accessToken);

            resolve(axios.request(originalReq));

          }else {
            console.log('response refreshToken: ', response);
          }
          resolve(response);
        }
      }

      return reject(err);
    });
  },
);
