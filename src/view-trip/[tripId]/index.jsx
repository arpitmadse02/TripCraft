import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [activeTab, setActiveTab] = useState("hotel");

  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  const getTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        toast.error("No trip found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading trip");
    }
  };

  if (!trip) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading trip...
      </div>
    );
  }

  return (
    <div className="p-10 md:px-20 lg:px-41 xl:px-56">
      <InfoSection trip={trip} />

     {/* Tabs */}
<div className="flex justify-center my-6 ">
<div className="flex gap-20 w-full h-16 px-4 py-2 bg-white rounded-2xl border border-black/15
 shadow-lg justify-center items-center">
    
    <button
      onClick={() => setActiveTab("hotel")}
      className={`px-12 py-1.5 font-medium transition
        ${activeTab === "hotel"
          ? "bg-[#43a5c0] text-white rounded-full"
          : " text-gray-700 hover:bg-gray-100 rounded-full"
        }`}
    >
      Hotels
    </button>
    
    <button
      onClick={() => setActiveTab("trip")}
      className={`px-12 py-1.5  font-medium transition
        ${activeTab === "trip"
          ? "bg-[#43a5c0] text-white rounded-full"
          : " text-gray-700 hover:bg-gray-100 rounded-full"
        }`}
    >
      Trip Plan
    </button>

  </div>
</div>


      <div className="w-full mt-6">
  {activeTab === "hotel" && <Hotels trip={trip} />}
  {activeTab === "trip" && <PlacesToVisit trip={trip} />}
</div>


    
    </div>
  );
}

export default ViewTrip;
