// src/pages/PersonalPage.tsx
import React, { useState, useEffect } from 'react';
import { FavoriteMovie } from '../types/Movie';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating';

const PersonalPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  useEffect(() => {
    const storedFavorites: FavoriteMovie[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const updateNote = (id: string, note: number) => {
    const updatedFavorites = favorites.map(movie =>
      movie.imdbID === id ? { ...movie, note } : movie
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-netflixDark min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Mes Favoris</h1>
      {favorites.length === 0 ? (
        <p>Aucun film ajouté aux favoris pour le moment.</p>
      ) : (
        favorites.map(movie => (
          <div
            key={movie.imdbID}
            className="border border-gray-700 p-4 mb-4 rounded bg-netflixGray"
          >
            <h2 className="text-xl font-bold mb-2">{movie.Title}</h2>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-48 h-auto rounded mb-2"
            />
            <p className="mb-2">{movie.Year} - {movie.Type}</p>
            <div className="flex items-center mb-2">
              <span className="mr-2">Note :</span>
              {/* Utilisation du composant StarRating pour la notation */}
              <StarRating
                rating={movie.note || 0}
                onRatingChange={(newRating) => updateNote(movie.imdbID, newRating)}
              />
            </div>
          </div>
        ))
      )}
      <Link to="/" className="text-netflixRed hover:underline">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default PersonalPage;
