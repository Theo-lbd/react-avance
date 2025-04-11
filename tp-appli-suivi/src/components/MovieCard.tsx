import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { OmdbMovie, FavoriteMovie } from '../types/Movie';

interface MovieCardProps {
  movie: OmdbMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const controls = useAnimation();

  useEffect(() => {
    const storedFavorites: FavoriteMovie[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(storedFavorites.some(fav => fav.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  // Fonction pour basculer l'état dans le localStorage et le state local
  const toggleFavorite = () => {
    const storedFavorites: FavoriteMovie[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      // Suppression
      const updatedFavorites = storedFavorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Ajout
      storedFavorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
      setIsFavorite(true);
    }
  };

  // Gestion de l'animation d'explosion au clic
  const handleExplosion = async () => {
    // Animation "d'explosion" : le bouton s'agrandit fortement, pivote, puis revient à l'état normal
    await controls.start({
      scale: [1, 1.8, 0.8, 1],
      rotate: [0, 30, -30, 0],
      transition: { duration: 0.6, ease: 'easeInOut' }
    });
    // Une fois l'animation terminée, on change l'état (ajout/suppression des favoris)
    toggleFavorite();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-netflixGray p-4 rounded shadow-lg flex flex-col items-center transform transition duration-300"
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-48 h-auto rounded mb-4"
      />
      <h3 className="text-white text-lg font-bold mb-2">{movie.Title}</h3>
      <p className="text-gray-300 mb-4">{movie.Year} - {movie.Type}</p>

      <motion.button
        animate={controls}
        onClick={handleExplosion}
        className="bg-netflixRed text-white px-4 py-2 rounded transition duration-200 mb-2"
      >
        {isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"}
      </motion.button>

      <Link
        to={`/movie/${movie.imdbID}`}
        className="text-netflixRed hover:underline transition-colors duration-200"
      >
        Voir les détails
      </Link>
    </motion.div>
  );
};

export default MovieCard;
