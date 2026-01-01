import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div className="w-full">
      {trip?.tripData?.itinerary?.map((item, index) => (
        <div
          key={index}
          className="mt-6 bg-white shadow-md border border-black/10 p-6 rounded-2xl"
        >
          <h2 className="text-lg text-gray-700 font-bold mb-4">
            Day {item.day}
          </h2>
<br />
          {item.plan.map((place, idx) => (
  <div key={idx} className="mb-6">
    <h2 className="text-sm font-semibold text-[#43a5c0] mb-1">
      {idx === 0 && "🌅 Morning"}
      {idx === 1 && "☀️ Afternoon"}
      {idx === 2 && "🌙 Evening"}
    </h2>

    <PlaceCardItem place={place} />
    <br />
  </div>
))}

        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
