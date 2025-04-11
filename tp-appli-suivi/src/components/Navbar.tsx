import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-netflixGray p-4 flex items-center justify-between shadow-md animate-fadeInUp">
      <div className="text-netflixRed text-2xl font-bold">
        <Link to="/">MyMovies</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="text-white hover:underline transition duration-200">Accueil</Link>
        <Link to="/personal" className="text-white hover:underline transition duration-200">Favoris</Link>
      </div>
    </nav>
  );
};

export default Navbar;