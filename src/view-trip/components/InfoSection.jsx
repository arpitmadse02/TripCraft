import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip) {
      getPlacePhoto();
    }
  }, [trip]);

  const getPlacePhoto = async () => {
    const query =
      trip?.userSelection?.location?.label ||
      trip?.userSelection?.location?.display_name;

    if (!query) return;

    try {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          query
        )}&per_page=1`,
        {
          headers: {
            Authorization: import.meta.env.VITE_PEXELS_API_KEY,
          },
        }
      );

      if (res.data.photos?.length > 0) {
        setPhotoUrl(res.data.photos[0].src.landscape);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-full h-[260px] md:h-[380px] rounded-xl overflow-hidden">
      {/* Background Image */}
      <img
        src={photoUrl || "/placeholder.jpg"}
        alt="Destination"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-5 md:p-8 text-white">
        <h2 className="flex items-center gap-2 text-xl md:text-3xl font-bold">
          <FaLocationDot />
          {trip?.userSelection?.location?.label ||
            trip?.userSelection?.location?.display_name ||
            "Unknown Location"}
        </h2>

        <div className="flex flex-wrap gap-5 mt-4 text-sm md:text-sm">
          {trip?.userSelection?.noOfDays && (
            <span className="px-3 py-1 rounded-full bg-white/30 backdrop-blur">
              ⏱️ {trip.userSelection.noOfDays} Days
            </span>
          )}

          {trip?.userSelection?.budget && (
            <span className="px-3 py-1 rounded-full bg-white/30 backdrop-blur">
              💵 {trip.userSelection.budget}
            </span>
          )}

          {trip?.userSelection?.traveler && (
            <span className="px-3 py-1 rounded-full bg-white/30 backdrop-blur">
              🍻 {trip.userSelection.traveler} Traveler(s)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
