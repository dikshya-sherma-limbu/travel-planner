import React from "react";
import image from "../../assets/image.jpeg";
import { Link } from "react-router-dom";
import { getPlaces } from "../../services/GlobalApi";
import { useState, useEffect } from "react";
import { PHOTO_REF_URL } from "../../services/GlobalApi";
function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    if (hotel?.hotelName) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel?.hotelName,
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
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel.hotelName +
        ", " +
        hotel?.hotelAddress
      }
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={photoUrl ? photoUrl : image}
        className="rounded-xl h-[180px] w-full "
        alt="travel"
      />
      <div className="my-2 flex flex-col gap-2">
        <h2 className="font-medium ">{hotel.hotelName}</h2>
        <h2 className=" text-xs text-gray-500 ">📍 {hotel.hotelAddress}</h2>
        <h2 className="text-sm">{hotel.price}</h2>
        <h2 className="text-sm">⭐ {hotel?.rating}</h2>
      </div>
    </Link>
  );
}

export default HotelCardItem;
