import { useState, useEffect } from 'react';
import { getMovies } from '../services/movieService';
import { OmdbMovie } from '../types/Movie';

export const useFetchMovies = (query: string) => {
  const [movies, setMovies] = useState<OmdbMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setMovies([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMovies(query);
        setMovies(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement des films');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { movies, loading, error };
};
