import api from './axios';

export const signupRequest = (payload) => api.post('/auth/signup', payload);

export const loginRequest = (payload) => api.post('/auth/login', payload);

export const logoutRequest = () => api.post('/auth/logout');
