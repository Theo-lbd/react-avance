// src/services/movieService.ts
import axios from 'axios';
import { OmdbMovie } from '../types/Movie';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = 'https://www.omdbapi.com/';

interface OmdbResponse {
  Search: OmdbMovie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export const getMovies = async (query: string): Promise<OmdbMovie[]> => {
  try {
    const response = await axios.get<OmdbResponse>(API_URL, {
      params: {
        apikey: API_KEY,
        s: query
      },
    });
    if (response.data.Response === 'True' && response.data.Search) {
      return response.data.Search;
    } else {
      throw new Error(response.data.Error || 'Aucun film trouvé');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    throw error;
  }
};
