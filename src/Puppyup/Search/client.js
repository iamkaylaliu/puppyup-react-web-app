import axios from "axios";
import { API_KEY } from "../../config";

export const findItems = async (searchTerm) => {
  const response = await axios.get(
    `${API_KEY}/ebay-search?q=${searchTerm}`
  );
  return response.data;
};

export const findItemById = async (itemId) => {
  const response = await axios.get(
    `${API_KEY}/ebay-item?itemId=${itemId}`
  );
  return response.data;
};


