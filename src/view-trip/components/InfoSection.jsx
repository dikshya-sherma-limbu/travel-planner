import React, { useEffect } from "react";
import { IoMdShareAlt } from "react-icons/io";
import { Button } from "../../components/ui/button";
import { getPlaces } from "../../services/GlobalApi";
import { useState } from "react";
import { PHOTO_REF_URL } from "../../services/GlobalApi";

function InfoSection({ trip }) {
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
    <div>
      <img
        src={photoUrl}
        className="h-[300px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center ">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5 ">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              💵 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              🥂 {trip?.userSelection?.traveler} travelers
            </h2>
          </div>
        </div>
        <Button>
          <IoMdShareAlt />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
