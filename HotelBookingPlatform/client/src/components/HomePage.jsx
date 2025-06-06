import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import hotelsData from "../data/hotels.json";

const BrowseHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedStar, setSelectedStar] = useState("All Stars");
  const [showRecommended, setShowRecommended] = useState(false);

  useEffect(() => {
    setHotels(hotelsData);
    setFilteredHotels(hotelsData);
  }, []);

  useEffect(() => {
    filterHotels();
  }, [searchText, selectedCity, selectedStar, showRecommended]);

  const filterHotels = () => {
    let filtered = [...hotels];

    if (searchText.trim() !== "") {
      filtered = filtered.filter(hotel =>
        hotel.hotel_name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCity !== "All Cities") {
      filtered = filtered.filter(hotel =>
        hotel.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    if (selectedStar !== "All Stars") {
      const stars = Number(selectedStar);
      filtered = filtered.filter(hotel => Math.round(hotel.star_rating) === stars);
    }

    if (showRecommended) {
      filtered = filtered.filter(hotel => hotel.rating_average >= 8.0);
    }

    setFilteredHotels(filtered);
  };

  const getUniqueCities = () => {
    const cities = hotels.map(h => h.city);
    return ["All Cities", ...Array.from(new Set(cities))];
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Explore Hotels</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search hotels"
          className="p-2 border rounded"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border rounded"
        >
          {getUniqueCities().map((city, idx) => (
            <option key={idx} value={city}>{city}</option>
          ))}
        </select>

        <select
          value={selectedStar}
          onChange={(e) => setSelectedStar(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All Stars">All Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showRecommended}
            onChange={() => setShowRecommended(!showRecommended)}
          />
          Show Recommended
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredHotels.length > 0 ? (
          filteredHotels.map(hotel => (
            <HotelCard key={hotel.hotel_id} hotel={hotel} />
          ))
        ) : (
          <p>No hotels match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseHotels;
