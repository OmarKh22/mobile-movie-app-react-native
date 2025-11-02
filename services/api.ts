import axios from 'axios';
import { useFetch } from './useFetch';

export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}

export const tmdbApi = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  headers: TMDB_CONFIG.headers,
});

// ✅ Hook for fetching popular movies
export const usePopularMovies = () => {
  return useFetch<MoviesResponse>({
    queryKey: ['popular-movies'],
    url: `${TMDB_CONFIG.BASE_URL}/movie/popular`,
    config: {
      headers: TMDB_CONFIG.headers,
    },
  });
};

// ✅ Search (this stays async)
export const searchMovies = async ({ query }: { query: string }) => {
  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query: encodedQuery,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('TMDB Search error:', error);
    throw error;
  }
};