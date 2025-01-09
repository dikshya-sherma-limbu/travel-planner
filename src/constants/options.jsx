// static data for options

export const SelectTravelList = [
  {
    id: 1,
    title: "A Couple",
    desc: "Travelling the world together",
    icon: "❤️",
    people: 2,
  },
  {
    id: 2,
    title: "Family",
    desc: "Family vacation",
    icon: "👨‍👨‍👧‍👦",
    people: 4,
  },
  {
    id: 3,
    title: "Solo Traveler",
    desc: "Exploring alone",
    icon: "👤",
    people: 1,
  },
  {
    id: 4,
    title: "Friends",
    desc: "Trip with friends",
    icon: "😎",
    people: 3,
  },
  {
    id: 5,
    title: "Business",
    desc: "Business trip",
    icon: "👩‍💼",
    people: 1,
  },
];

export const SelectBuDgetOptions = [
  {
    id: 4,
    title: "Backpacker",
    desc: "Budget-friendly travel",
    icon: "🪙",
  },

  {
    id: 2,
    title: "Moderate",
    desc: "Balanced spending",
    icon: "💸",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "High-end experience",
    icon: "🤑",
  },
];

export const AI_PROMPT =
  "Generate my trip plan for Location: {location}, for {noOfDays} Days for {traveler} with a {budget} budget, give me hotels options list with HotelName, Hotel Address, Price, hotel image URL, geo coordinates, rating, description and suggest itinerary with placeName, Place Details, Place Image URL, Geo Coordinates, ticket Pricing, rating, Time travel to each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";
