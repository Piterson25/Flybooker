import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getFlightsAdmin = async (keycloak) => {
  try {
    const response = await API.get('/admin', {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFlight = async (keycloak, flightId) => {
  try {
    const response = await API.delete(`/admin/flights/${flightId}`, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFlights = async (keycloak) => {
  try {
    const response = await API.get('/user', {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
