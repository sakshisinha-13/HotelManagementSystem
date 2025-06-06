import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import hotelData from "../data/hotels.json";

const BrowseHotels = ({ onVisit, onDraft, onComplete }) => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedStars, setSelectedStars] = useState("All Stars");
  const [showRecommended, setShowRecommended] = useState(false);

  useEffect(() => {
    setHotels(hotelData);
  }, []);

  const uniqueCities = [
    ...new Set(hotels.map((hotel) => hotel.city).filter(Boolean)),
  ];

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.hotel_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCity =
      selectedCity === "All Cities" || hotel.city === selectedCity;

    const matchesStars =
      selectedStars === "All Stars" ||
      Number(hotel.star_rating) === Number(selectedStars);

    const matchesRecommendation =
      !showRecommended || hotel.rating_average >= 8.0;

    return (
      matchesSearch &&
      matchesCity &&
      matchesStars &&
      matchesRecommendation
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Explore Hotels</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search hotels"
          className="border p-2 rounded w-48"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option>All Cities</option>
          {uniqueCities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedStars}
          onChange={(e) => setSelectedStars(e.target.value)}
        >
          <option>All Stars</option>
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star}
            </option>
          ))}
        </select>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showRecommended}
            onChange={(e) => setShowRecommended(e.target.checked)}
          />
          <span>Show Recommended</span>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <HotelCard
            key={hotel.hotel_id}
            hotel={hotel}
            onVisit={onVisit}
            onDraft={onDraft}
            onComplete={onComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowseHotels;
