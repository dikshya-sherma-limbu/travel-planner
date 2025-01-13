import React from "react";

import { getPlaces } from "../../services/GlobalApi";
import { PHOTO_REF_URL } from "../../services/GlobalApi";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);
  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };

      const res = await getPlaces(data); // Ensure this resolves correctly

      const photoReference = res.data.places[0].photos[3].name;
      if (photoReference) {
        const picUrl = PHOTO_REF_URL.replace("{NAME}", photoReference);

        setPhotoUrl(picUrl);
      } else {
        console.error("Photo reference not found");
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };
  return (
    <Link to={`/view-trip/${trip?.docId}`}>
      <div className="bg-white p-4 rounded-xl shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
        <img
          src={photoUrl}
          className="object-cover rounded-xl w-[250px] h-[200px]"
          alt="e"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2>
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
