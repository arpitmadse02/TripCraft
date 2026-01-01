import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

  // Determine a user-friendly location label
  const locationLabel =
    typeof trip?.userSelection?.location === 'string'
      ? trip.userSelection.location
      : trip?.userSelection?.location?.display_name ||
        trip?.userSelection?.location?.name ||
        'Unknown Location';

  useEffect(() => {
    if (locationLabel && locationLabel !== 'Unknown Location') {
      GetPlacePhoto();
    }
  }, [locationLabel]);

  const GetPlacePhoto = async () => {
    try {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(locationLabel)}&per_page=1`,
        {
          headers: {
            Authorization: import.meta.env.VITE_PEXELS_API_KEY,
          },
        }
      );
      if (res.data.photos && res.data.photos.length > 0) {
        setPhotoUrl(res.data.photos[0].src.landscape);
      }
    } catch (error) {
      console.error("Error fetching trip photo:", error);
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="transition-all bg-white  shadow-md rounded-xl hover:scale-105">
        <img
          src={photoUrl}
          className="rounded-t-xl h-[200px] w-full h-full object-cover"
          alt={locationLabel}
        />
        <h2 className="mt-2 p-3 overflow-hidden text-lg font-bold text-gray-700 text-ellipsis whitespace-nowrap">
          {locationLabel}
        </h2>
        <h2 className="text-sm p-3 text-gray-500">
          {
            typeof trip?.userSelection?.noOfDays === "number"
              ? `${trip.userSelection.noOfDays} Day${trip.userSelection.noOfDays > 1 ? 's' : ''}`
              : trip?.userSelection?.noOfDays
          }
           day trip with {trip?.userSelection?.budget} Budget
        </h2>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
