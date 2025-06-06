import React from 'react';
import { Link } from 'react-router-dom';
import hotels from '../data/hotels.json';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-700">🏨 StayEasy - Hotel Booking</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-xl font-semibold mb-6">Browse Hotels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hotels.map(hotel => (
            <Link
              key={hotel.id}
              to={`/hotel/${hotel.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 border border-gray-200"
            >
              <img
                src={`https://source.unsplash.com/400x200/?hotel,${hotel.location}`}
                alt="hotel"
                className="rounded-t-xl w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{hotel.name}</h3>
                <p className="text-gray-500">📍 {hotel.location}</p>
                <p className="text-yellow-500 font-semibold">⭐ {hotel.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-white shadow p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} StayEasy. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;