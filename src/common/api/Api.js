import { create } from 'apisauce';
import { BASE_URL } from '../Config';

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
  testApi() {
    return apiConfig
      .get('/')
      .then(response => response)
  },
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
  forgotPassword(email) {
    return apiConfig
      .post('/users/forgot', { email })
      .then(response => response);
  },
};
