import axios from "axios";

export const register = (body) => {
  return axios.post(`http://localhost:5000/auth/register`, body);
};
export const login = (body) => {
  return axios.post(`http://localhost:5000/auth/login`, body);
};
export const logout = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`http://localhost:5000/auth/logout`, config);
};
