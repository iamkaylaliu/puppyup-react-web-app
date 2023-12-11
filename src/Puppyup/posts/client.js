import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/posts`;
const request = axios.create({
  withCredentials: true,
});

  export const findAllPosts = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data;
  };

  export const createUserPosts = async (post) => {
    const response = await request.post(`${USERS_API}`, post);
    return response.data;
  };
  
  export const findPostsByUser = async (userId) => {
    const response = await request.get(`${USERS_API}/${userId}`);
    return response.data;
  };

  export const findPostsByItem = async (itemId) => {
    const response = await request.get(`${USERS_API}/item/${itemId}`);
    return response.data;
  };
  
  export const deleteUserPostsItem = async (postId) => {
    const response = await request.delete(
      `${USERS_API}/${postId}`);
    return response.data;
  };

  export const updatePost = async (postId, newPost) => {
    const response = await request.put(
      `${USERS_API}/${postId}`,newPost);
    return response.data;  
  }
  export const generateRandomPosts = async () => {
    const response = await request.get(
        `${BASE_API}/api/random`);
    return response.data;
  };
  


  
     
  