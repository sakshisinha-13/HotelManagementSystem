export function generateRecommendations(filteredHotels, allHotels) {
  if (!filteredHotels || !Array.isArray(filteredHotels)) return [];
  if (!allHotels || !Array.isArray(allHotels)) return [];

  const visits = JSON.parse(localStorage.getItem("visits") || "{}");
  const completed = JSON.parse(localStorage.getItem("completedBookings") || "[]");
  const drafts = JSON.parse(localStorage.getItem("draftBookings") || "[]");

  const activityIds = new Set([
    ...Object.keys(visits).map(Number),
    ...completed.map(h => h.hotel_id),
    ...drafts.map(h => h.hotel_id),
  ]);

  const activityHotels = allHotels.filter(h => activityIds.has(h.hotel_id));
  const visitedCities = new Set(activityHotels.map(h => h.city));

  const recSet = new Set();

  filteredHotels.forEach(hotel => {
    if (
      !activityIds.has(hotel.hotel_id) &&
      visitedCities.has(hotel.city)
    ) {
      recSet.add(hotel);
    }
  });

  const topRated = filteredHotels.filter(hotel => hotel.rating_average >= 8.5);
  topRated.forEach(hotel => {
    if (!activityIds.has(hotel.hotel_id)) recSet.add(hotel);
  });

  return Array.from(recSet).slice(0, 5);
}
