import React from 'react'
import HotelCardItem from './HotelCardItem'
<br />
function Hotels({ trip }) {
  return (
    <div className="w-full">
     
<br />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

export default Hotels
