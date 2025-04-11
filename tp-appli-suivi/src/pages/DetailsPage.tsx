import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 'id' correspond à l'imdbID
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const API_URL = 'https://www.omdbapi.com/';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get<MovieDetail>(API_URL, {
          params: {
            apikey: API_KEY,
            i: id,           // Recherche par imdbID
            plot: 'full'     // Pour obtenir un synopsis complet
          }
        });
        if (response.data.Response === 'True') {
          setMovie(response.data);
          setError(null);
        } else {
          setError(response.data.Error || 'Film non trouvé');
        }
      } catch (err) {
        setError('Erreur lors de la récupération du film');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, API_KEY]);

  if (loading) return <p className="text-white p-6">Chargement...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;
  if (!movie) return <p className="text-white p-6">Aucun film trouvé</p>;

  return (
    <div className="bg-netflixDark min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-80 h-auto rounded-lg shadow-md mb-4"
      />
      <p className="mb-2"><strong>Année :</strong> {movie.Year}</p>
      <p className="mb-2"><strong>Genre :</strong> {movie.Genre}</p>
      <p className="mb-2"><strong>Réalisateur :</strong> {movie.Director}</p>
      <p className="mb-4"><strong>Synopsis :</strong> {movie.Plot}</p>
      <Link to="/" className="text-netflixRed hover:underline">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default DetailsPage;