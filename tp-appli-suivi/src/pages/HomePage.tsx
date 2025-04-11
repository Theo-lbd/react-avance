import React, { useState, useEffect } from 'react';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { OmdbMovie } from '../types/Movie';
import MovieCard from '../components/MovieCard';

const defaultSearchTerms = ["batman", "star", "avengers", "love", "action"];

const HomePage: React.FC = () => {
  // On initialise le state avec une chaîne vide
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Au montage, si searchTerm est vide, on choisit un terme aléatoire
  useEffect(() => {
    if (searchTerm.trim() === "") {
      const randomTerm = defaultSearchTerms[Math.floor(Math.random() * defaultSearchTerms.length)];
      setSearchTerm(randomTerm);
    }
  }, [searchTerm]);

  // Utiliser le terme de recherche pour récupérer les films
  const { movies, loading, error } = useFetchMovies(searchTerm);

  return (
    <div className="bg-netflixDark min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Recherche de Films</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un film"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded w-80 bg-gray-700 text-white border border-gray-600"
        />
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie: OmdbMovie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;