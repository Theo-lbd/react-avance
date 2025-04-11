import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-netflixGray p-4 mt-8 text-center text-gray-400 animate-fadeInUp">
      <p>&copy; {new Date().getFullYear()} Theo. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;