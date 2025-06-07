import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import hotelsData from "../data/hotels.json";

const BrowseHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [recommendedHotels, setRecommendedHotels] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedStar, setSelectedStar] = useState("All Stars");

  useEffect(() => {
    setHotels(hotelsData);
    setFilteredHotels(hotelsData);
    generateRecommendations(hotelsData);
  }, []);

  // ✅ Now filters also re-run when hotels are loaded
  useEffect(() => {
    if (hotels.length > 0) {
      filterHotels();
    }
  }, [searchText, selectedCity, selectedStar, hotels]);

  const filterHotels = () => {
    let filtered = [...hotels];

    if (searchText.trim()) {
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

    setFilteredHotels(filtered);
  };

  const getUniqueCities = () => {
    const cities = hotels.map(h => h.city);
    return ["All Cities", ...Array.from(new Set(cities))];
  };

  const generateRecommendations = (hotels) => {
    const visits = JSON.parse(localStorage.getItem("visits")) || {};
    const completed = JSON.parse(localStorage.getItem("completedBookings")) || [];

    const completedHotelIds = completed.map(h => h.hotel_id);

    const recommended = hotels
      .filter(hotel =>
        hotel.rating_average >= 8.0 ||
        visits[hotel.hotel_id] >= 2 ||
        completedHotelIds.includes(hotel.hotel_id)
      )
      .slice(0, 5);

    setRecommendedHotels(recommended);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between p-2">
      {/* Left Filter Panel (Sticky) */}
      <div className="lg:w-[15%] lg:sticky lg:top-20 h-fit bg-white shadow p-4 rounded mb-6 lg:mb-0">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <input
          type="text"
          placeholder="Search hotels"
          className="w-full p-2 mb-4 border rounded"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          {getUniqueCities().map((city, idx) => (
            <option key={idx} value={city}>{city}</option>
          ))}
        </select>

        <select
          value={selectedStar}
          onChange={(e) => setSelectedStar(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="All Stars">All Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      {/* Hotel Grid & Recommendations */}
      <div className="flex-1 lg:w-[80%] flex flex-col lg:flex-row gap-3 justify-evenly">
        {/* Hotel Cards */}
        <div className="w-full lg:w-[70%] p-3">
          <h1 className="text-3xl font-bold mb-4">Explore Hotels</h1>
          <div className="flex flex-wrap justify-evenly gap-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map(hotel => (
                <HotelCard key={hotel.hotel_id} hotel={hotel} />
              ))
            ) : (
              <p>No hotels match your criteria.</p>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:w-[28%]">
          <h2 className="text-xl font-semibold mb-3">Recommended for You</h2>
          {recommendedHotels.length > 0 ? (
            recommendedHotels.map(hotel => (
              <HotelCard key={hotel.hotel_id} hotel={hotel} />
            ))
          ) : (
            <p>No recommendations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseHotels;
