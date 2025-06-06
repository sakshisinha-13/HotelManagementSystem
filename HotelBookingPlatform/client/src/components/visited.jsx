import React from 'react';

const Visited = () => {
  const visitedHotels = JSON.parse(localStorage.getItem('visitedHotels')) || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Visited Hotels</h2>
      {visitedHotels.length === 0 ? (
        <p>No hotels visited yet.</p>
      ) : (
        <ul className="space-y-2">
          {visitedHotels.map((hotel, idx) => (
            <li key={idx}>{hotel.hotel_name} - {hotel.city}, {hotel.country}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Visited;
