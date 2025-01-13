import React, { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import { db } from "@/services/FireBaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigation();
  const [userTrips, setUserTrips] = React.useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);
  // get all user trips
  const GetUserTrips = async () => {
    // fetch user trips
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    }
    const getUserData = query(
      collection(db, "tripPlanner"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(getUserData);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <div className="flex flex-col items-center justify-center sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mt-5">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} />
            ))
          : [...Array(6)].map((_, index) => (
              <div key={index}>
                <div className="bg-white p-4 rounded-xl shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-xl bg-gray-100 h-[200px] w-[250px]"></div>
                    <div className="flex flex-col space-y-2">
                      <div className="rounded-xl bg-gray-300 h-5 w-3/4"></div>
                      <div className="rounded-xl bg-gray-300 h-5 w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
