import { create } from 'apisauce';
import { BASE_URL } from '../Config';
import secureStore from '../SecureStorageService';

export const apiConfig = create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' },
});

const setHeader = (key, value) => apiConfig.setHeader(key, value);

export const initApi = async (accessToken) => {
  if (accessToken) {
    setHeader('Authorization', `Bearer ${accessToken}`);
  }
};

export const api = {
  signIn(email, password) {
    return apiConfig
      .post('/login', { email, password })
      .then(response => {
        if (response.ok) {
          setHeader('Authorization', `Bearer ${response.data.accessToken}`);
        }
        return response;
      });
  },
  signUp(data) {
    return apiConfig
      .post('/users', data)
      .then(response => {
        if (response.ok) {
          setHeader('Authorization', `Bearer ${response.data.accessToken}`);
        }
        return response;
      });
  },
  logout(refreshToken) {
    return apiConfig
      .post('/logout', { refreshToken })
      .then(response => {
        setHeader('Authorization', '');
        return response;
      });
  },
  refreshToken(token) {
    return apiConfig
      .post('/token', { token })
      .then(response => {
        if (response.ok) {
          setHeader('Authorization', `Bearer ${response.data.accessToken}`);
        }
        return response;
      });
  },
  getUserById(userId) {
    return apiConfig
      .get('/users/21a693e3-d11f-4d5e-afeb-1289d21905c9')
      .then(response => response);
  },
  getUsers() {
    return apiConfig
      .get('/users/')
      .then(response => response);
  },
};
