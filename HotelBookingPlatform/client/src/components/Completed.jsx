import React from 'react';

const Completed = () => {
  const completed = JSON.parse(localStorage.getItem('completedBookings')) || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Completed Bookings</h2>
      {completed.length === 0 ? (
        <p>No completed bookings.</p>
      ) : (
        <ul className="space-y-2">
          {completed.map((hotel, idx) => (
            <li key={idx}>{hotel.hotel_name} - {hotel.city}, {hotel.country}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Completed;
