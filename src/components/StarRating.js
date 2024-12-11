import React from 'react';

const StarRating = ({ rating, setRating }) => {
  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          style={{
            color: star <= rating ? '#ffc107' : '#e4e5e9',
            marginRight: '5px'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
