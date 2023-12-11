import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const DOCTORS_API = `${BASE_API}/api/doctors`;
const request = axios.create({
  withCredentials: true,
});

export const findAllDoctors = async () => {
  const response = await request.get(`${DOCTORS_API}`);
  return response.data;
};

export const findDoctorById = async (id) => {
  const response = await request.get(`${DOCTORS_API}/${id}`);
  return response.data;
};

export const createDoctor = async (doctor) => {
  const response = await request.post(`${DOCTORS_API}`, { ...doctor, _id: undefined });
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await request.delete(
    `${DOCTORS_API}/${id}`);
  return response.data;
};

export const updateDoctor = async (id, doctor) => {
  const response = await request.put(
    `${DOCTORS_API}/${id}`, doctor);
  return response.data;
}

export const findDoctorByVet = async (vetId) => {
    const response = await request.get(`${BASE_API}/api/vet/doctors/${vetId}`);
    return response.data;
};




