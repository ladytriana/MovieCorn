import axios from 'axios';

// Alamat Backend Node.js kamu
const API_URL = 'http://localhost:5000/api';

export const getFavorites = async () => {
    const response = await axios.get(`${API_URL}/favorites`);
    return response.data;
};

export const addToFavorites = async (movieData) => {
    const response = await axios.post(`${API_URL}/favorites`, movieData);
    return response.data;
};