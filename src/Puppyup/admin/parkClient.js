import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const PARKS_API = `${BASE_API}/api/parks`;
const request = axios.create({
  withCredentials: true,
});

export const findAllParks = async () => {
  const response = await request.get(`${PARKS_API}`);
  return response.data;
};

export const findParkById = async (id) => {
  const response = await request.get(`${PARKS_API}/${id}`);
  return response.data;
};

export const createPark = async (park) => {
  const response = await request.post(`${PARKS_API}`, { ...park, _id: undefined });
  return response.data;
};

export const deletePark = async (id) => {
  const response = await request.delete(
    `${PARKS_API}/${id}`);
  return response.data;
};

export const updatePark = async (id, park) => {
  const response = await request.put(
    `${PARKS_API}/${id}`, park);
  return response.data;
}




