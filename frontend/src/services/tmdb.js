import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'id-ID', // Bahasa Indonesia
    },
});

export const getTrendingMovies = async () => {
    const response = await tmdb.get('/movie/popular');
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await tmdb.get('/search/movie', { params: { query } });
    return response.data.results;
};

export const getMovieDetail = async (id) => {
    const response = await tmdb.get(`/movie/${id}`);
    return response.data;
};

export const getImageUrl = (path) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://placehold.co/500x750?text=No+Image';
};