import { create } from 'apisauce';
import { BASE_URL } from './Config';

const apiConfig = create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' },
});

export const api = {
  signIn(email, password) {
    return apiConfig
      .post('/login', { email, password })
      .then(response => response);
  },
};
