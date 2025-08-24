import axios from 'axios';

const API_KEY = '5d04c035a6de40399caf77b961eea39e'; // Users will need to get their own API key
const BASE_URL = 'https://api.rawg.io/api';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const gameAPI = {
  // Search games by name
  searchGames: async (query, page = 1, pageSize = 20) => {
    try {
      const response = await api.get('/games', {
        params: {
          search: query,
          page,
          page_size: pageSize,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to search games');
    }
  },

  // Get popular/trending games
  getPopularGames: async (page = 1, pageSize = 20) => {
    try {
      const response = await api.get('/games', {
        params: {
          ordering: '-added',
          page,
          page_size: pageSize,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch popular games');
    }
  },

  // Get game details by ID
  getGameDetails: async (id) => {
    try {
      const response = await api.get(`/games/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch game details');
    }
  },

  // Get game screenshots
  getGameScreenshots: async (id) => {
    try {
      const response = await api.get(`/games/${id}/screenshots`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch game screenshots');
    }
  },

  // Get game trailers
  getGameTrailers: async (id) => {
    try {
      const response = await api.get(`/games/${id}/movies`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch game trailers');
    }
  },
};

export default gameAPI;
