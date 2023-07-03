import React, { useEffect, useState } from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { getFlightsAdmin, deleteFlight } from "../api/index"

const Superpage = () => {
  const { keycloak, initialized } = useKeycloak();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    if (initialized) {
      getFlightsAdmin(keycloak).then((x) => setFlights(x))
    }
  }, [keycloak, initialized])

  const handleDeleteFlight = async (flightId) => {
    try {
      await deleteFlight(keycloak, flightId);
      setFlights((prevFlights) => prevFlights.filter((flight) => flight._id !== flightId));
    } catch (error) {
      console.log(error);
    }
  };

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
          <button className="delete-button" onClick={() => handleDeleteFlight(flight._id)}>Delete flight</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Superpage;
