import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const STAFFS_API = `${BASE_API}/api/staffs`;
const request = axios.create({
  withCredentials: true,
});

export const findAllStaffs = async () => {
  const response = await request.get(`${STAFFS_API}`);
  return response.data;
};

export const findStaffById = async (id) => {
  const response = await request.get(`${STAFFS_API}/${id}`);
  return response.data;
};

export const createStaff = async (staff) => {
  const response = await request.post(`${STAFFS_API}`, { ...staff, _id: undefined });
  return response.data;
};

export const deleteStaff = async (id) => {
  const response = await request.delete(
    `${STAFFS_API}/${id}`);
  return response.data;
};

export const updateStaff = async (id, staff) => {
  const response = await request.put(
    `${STAFFS_API}/${id}`, staff);
  return response.data;
}

export const findStaffsByPark = async (parkId) => {
    const response = await request.get(`${BASE_API}/api/park/staffs/${parkId}`);
    return response.data;
}



