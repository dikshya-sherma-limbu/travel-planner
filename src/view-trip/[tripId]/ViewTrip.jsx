import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/FireBaseConfig";
import { toast } from "sonner";
import { useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import DailyPlan from "../components/DailyPlan";
import Footer from "../components/Footer";

export default function ViewTrip() {
  const tripId = useParams().tripId;
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered");
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  // Get trip data from firebase
  const GetTripData = async () => {
    const docref = doc(db, "tripPlanner", tripId);
    const docSnap = await getDoc(docref);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      toast("No such document!");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-45 xl:px-57 ">
      {/** Information Section */}
      <InfoSection trip={trip} />
      {/** Recommended Hotels */}
      <Hotels trip={trip} />
      {/** Daily Plan */}
      <DailyPlan trip={trip} />
      {/** Footer*/}
      <Footer trpi={trip} />
    </div>
  );
}
