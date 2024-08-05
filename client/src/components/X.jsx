import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { findTimeZone, getZonedTime } from 'timezone-support';
// import { lookup } from 'geo-tz';

const LocationTimeDisplay = () => {
//   const [location, setLocation] = useState({ lat: null, lng: null, alt: null });
//   const [dateTime, setDateTime] = useState(null);

//   useEffect(() => {
//     console.log(navigator)
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude, altitude } = position.coords;
//           setLocation({ lat: latitude, lng: longitude, alt: altitude });

//           // Get the time zone from the geographical coordinates
//           const timeZone = lookup(latitude, longitude)[0];
          
//           // Create a Luxon DateTime object with the user's time zone
//           const userDateTime = DateTime.now().setZone(timeZone);
//           setDateTime(userDateTime);
//         },
//         (error) => {
//           console.error("Error getting user location: ", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

  return (
    <div>
      {/* <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
      <p>Altitude: {location.alt ? location.alt + ' meters' : 'N/A'}</p>
      <p>Local Date and Time: {dateTime ? dateTime.toLocaleString(DateTime.DATETIME_MED) : 'Loading...'}</p> */}
      Hello
    </div>
  );
};

export default LocationTimeDisplay;
