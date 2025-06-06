import React from 'react';

const Drafts = () => {
  const drafts = JSON.parse(localStorage.getItem('draftBookings')) || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Draft Bookings</h2>
      {drafts.length === 0 ? (
        <p>No draft bookings.</p>
      ) : (
        <ul className="space-y-2">
          {drafts.map((hotel, idx) => (
            <li key={idx}>{hotel.hotel_name} - {hotel.city}, {hotel.country}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Drafts;
