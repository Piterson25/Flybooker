import React, { useEffect, useState } from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { getFlights } from "../api/index"

const Securedpage = () => {
  const { keycloak, initialized } = useKeycloak();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    if (initialized) {
      getFlights(keycloak).then((x) => setFlights(x))
    }
  }, [keycloak, initialized])

  return (
    <div className="flight-list">
      {flights.map((flight) => (
        <div className="flight" key={flight._id}>
          <p className="flight-id">Flight {flight._id}</p>
          <p className="flight-airline">Airline: {flight.airline}</p>
          <p className="flight-origin">Departure: {flight.origin}</p>
          <p className="flight-destination">Destination: {flight.destination}</p>
          <p className="flight-departure">Departure Date: {flight.departureDate}</p>
          <p className="flight-arrival">Arrival Date: {flight.arrivalDate}</p>
          <img id="dest" alt="img" src={flight.image} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Securedpage;