import React from 'react';

const HotelCard = ({ hotel }) => {
  const {
    photo1,
    hotel_name,
    city,
    country,
    star_rating,
    rates_from,
    url
  } = hotel;

  const handleVisit = () => {
    // Increment visit count in localStorage
    const visits = JSON.parse(localStorage.getItem('visits')) || {};
    visits[hotel.hotel_id] = (visits[hotel.hotel_id] || 0) + 1;
    localStorage.setItem('visits', JSON.stringify(visits));
    window.open(url, '_blank');
  };

  const handleDraft = () => {
    const drafts = JSON.parse(localStorage.getItem('draftBookings')) || [];
    if (!drafts.some(h => h.hotel_id === hotel.hotel_id)) {
      drafts.push(hotel);
      localStorage.setItem('draftBookings', JSON.stringify(drafts));
      alert("Saved to draft bookings!");
    } else {
      alert("Already in draft bookings.");
    }
  };

  const handleComplete = () => {
    const bookings = JSON.parse(localStorage.getItem('completedBookings')) || [];
    if (!bookings.some(h => h.hotel_id === hotel.hotel_id)) {
      bookings.push(hotel);
      localStorage.setItem('completedBookings', JSON.stringify(bookings));
      alert("Booking marked as completed!");
    } else {
      alert("Already marked as completed.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-[300px] m-4">
      <img
        src={photo1}
        alt={hotel_name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = '/default.jpg'; // fallback image path if image fails
        }}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{hotel_name}</h2>
        <p className="text-gray-600">{city}, {country}</p>
        <p className="text-yellow-500 mt-1">⭐ {star_rating}</p>
        <p className="text-green-600 font-semibold mt-1">${rates_from} / night</p>
        
        <div className="mt-4 space-y-2">
          <button
            className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
            onClick={handleVisit}
          >
            Visit
          </button>
          <button
            className="w-full bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
            onClick={handleDraft}
          >
            Draft Book
          </button>
          <button
            className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600"
            onClick={handleComplete}
          >
            Complete Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
