import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const PRODUCTS_API = `${BASE_API}/api/products`;
const request = axios.create({
  withCredentials: true,
});

export const findAllProducts = async () => {
  const response = await request.get(`${PRODUCTS_API}`);
  return response.data;
};

export const findProductById = async (id) => {
  const response = await request.get(`${PRODUCTS_API}/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await request.post(`${PRODUCTS_API}`, { ...product, _id: undefined });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await request.delete(
    `${PRODUCTS_API}/${id}`);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await request.put(
    `${PRODUCTS_API}/${id}`, product);
  return response.data;
}

export const findProductsBySeller = async (sellerId) => {
    const response = await request.get(`${BASE_API}/api/seller/products/${sellerId}`);
    return response.data;
};





