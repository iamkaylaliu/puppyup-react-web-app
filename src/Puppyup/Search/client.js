import axios from "axios";
export const API_KEY = process.env.REACT_APP_API_BASE;


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


