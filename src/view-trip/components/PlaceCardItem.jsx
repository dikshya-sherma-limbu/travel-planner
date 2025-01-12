import React from "react";
import image from "../../assets/travel.jpeg";
import { ImLocation2 } from "react-icons/im";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlaces } from "../../services/GlobalApi";
import { PHOTO_REF_URL } from "../../services/GlobalApi";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      console.log("trip: " + place?.placeName);
      const data = {
        textQuery: place?.placeName,
      };

      const res = await getPlaces(data); // Ensure this resolves correctly
      console.log("res: " + res.data);

      const photoReference = res.data.places[0].photos[3].name;
      if (photoReference) {
        const picUrl = PHOTO_REF_URL.replace("{NAME}", photoReference);
        console.log("placecard url: " + picUrl); // Debug the URL or use it as needed
        setPhotoUrl(picUrl);
      } else {
        console.error("Photo reference not found");
      }
    } catch (error) {
      console.log("Error in GetPlacePhoto:");
    }
  };
  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
      rel="noreferrer"
    >
      <div className="border rounded-xl bg-white p-4 mt-2 flex gap-5 hover:scale-105 transition-all duration-300 cursor-pointer">
        <img
          scr={photoUrl ? photoUrl : image}
          alt="days"
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-medium text-lg">{place.placeName}</h2>
          <h2 className="text-sm text-gray-400">{place.placeDetails}</h2>
          <h2 className="mt-3">🕑 {place.timeTravel}</h2>
          <Button>
            <ImLocation2 />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
