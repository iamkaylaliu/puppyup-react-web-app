import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const USERS_API = `${API_BASE}/api/users`;
const LIKES_API = `${API_BASE}/api/likes`;

export const findAllLikes = async () => {};
export const createUserLikesItem = async (userId, itemId) => {
  const response = await axios.post(`${USERS_API}/${userId}/likes/${itemId}`);
  return response.data;
};
export const deleteUserLikesItem  = async (userId, itemId) => {};
export const findUsersThatLikeItem  = async (itemId) => {
  const response = await axios.get(`${LIKES_API}/${itemId}/users`);
  return response.data;
};
export const findItemsThatUserLikes = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/likes`);
  return response.data;
};