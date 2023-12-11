import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const VETS_API = `${BASE_API}/api/vets`;
const request = axios.create({
  withCredentials: true,
});

  export const findAllVets = async () => {
    const response = await request.get(`${VETS_API}`);
    return response.data;
  };

  export const findVetById = async (id) => {
    const response = await request.get(`${VETS_API}/${id}`);
    return response.data;
  };

  export const createVet = async (vet) => {
    const response = await request.post(`${VETS_API}`, {...vet, _id: undefined});
    return response.data;
  };
  
  export const deleteVet = async (id) => {
    const response = await request.delete(
      `${VETS_API}/${id}`);
    return response.data;
  };

  export const updateVet = async (id, vet) => {
    const response = await request.put(
      `${VETS_API}/${id}`,vet);
    return response.data;  
  }

  

  
     
  