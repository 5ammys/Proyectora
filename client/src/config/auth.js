import axios from './axios.js'

export const registerUser = user => axios.post(`/register`, user);
export const loginUser = user => axios.post(`/login`,user);
export const verifyToken = () => axios.get('/auth/verify');
export const logoutUser = () => axios.post('/logout');
