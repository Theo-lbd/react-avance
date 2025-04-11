import React, { useState } from 'react';

interface StarRatingProps {
  maxStars?: number;
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  rating,
  onRatingChange,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (starIndex: number) => {
    onRatingChange(starIndex);
  };

  return (
    <div className="flex">
      {Array.from({ length: maxStars }, (_, i) => {
        const starIndex = i + 1;
        // Si l'utilisateur survole une étoile, on utilise cette valeur,
        // sinon, on affiche la note actuelle.
        const fill = (hovered || rating) >= starIndex;
        return (
          <span
            key={starIndex}
            className={`text-2xl cursor-pointer transition-colors duration-200 ${
              fill ? 'text-netflixRed' : 'text-gray-400'
            }`}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => setHovered(starIndex)}
            onMouseLeave={() => setHovered(null)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;