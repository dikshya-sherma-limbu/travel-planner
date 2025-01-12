import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function DailyPlan({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>
      <div>
        {trip.tripData?.itinerary?.days?.map((visit, index) => (
          <React.Fragment key={index}>
            <h2 className="font-medium text-lg">Day {visit.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {visit.plan.map((place, index) => (
                <div key={index} className="my-3">
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default DailyPlan;
