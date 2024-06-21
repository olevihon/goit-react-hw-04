import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'BUbgauRcHghDdL5M58beNs5AjLEV7KNDHBliA9dHbFs';
const IMAGES_PER_PAGE = 12;

export const fetchImages = async (query, page) => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      query: query,
      page: page,
      per_page: IMAGES_PER_PAGE,
      client_id: API_KEY,
    },
  });
  return response.data;
};
