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

export const createGames = (body) => {
  return axios.post(`http://localhost:5000/games/add`, body);
};
export const getGames = () => {
  return axios.get(`http://localhost:5000/games/all`);
};

export const createRound = (body) => {
  return axios.post(`http://localhost:5000/rounds/add`, body);
};
