import React from "react";

import HotelCardItem from "./HotelCardItem";
function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotels Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <HotelCardItem hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
