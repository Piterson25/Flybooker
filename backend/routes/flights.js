const express = require('express');
const session = require('express-session');
const recordRoutes = express.Router();
const dbo = require('../db/conn');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const config = require("../keyclock.json");
const { ObjectId } = require('mongodb');

const { NodeAdapter } = require("ef-keycloak-connect");
const keycloak = new NodeAdapter(config);

recordRoutes.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
  })
);
recordRoutes.use(keycloak.middleware());
recordRoutes.use(cors());

recordRoutes.get('/user', keycloak.protect(), async (req, res) => {
  const token = req.kauth.grant.access_token.token;
  const decodedToken = jwt.decode(token, { complete: true });

  if (decodedToken) {
    const db = dbo.getDb();
    const collection = db.collection('flights');
    const flights = await collection.find().limit(3).toArray();
    const userFlights = flights.map((flight) => {
      const { _id, ...flightWithoutId } = flight;
      return flightWithoutId;
    });

    res.json(userFlights);
  } else {
    res.status(401).json({ error: "Invalid token" });
  }
});

recordRoutes.get('/admin', keycloak.protect(), async (req, res) => {

  const token = req.kauth.grant.access_token.token;
  const decodedToken = jwt.decode(token, { complete: true });

  if (decodedToken) {
    const roles = decodedToken.payload.realm_access.roles || [];
    if (roles.includes("admin")) {
      const db = dbo.getDb();
      const collection = db.collection('flights');
      const flights = await collection.find().toArray();
      console.log(flights)
      res.json(flights);
    }

  } else {
    res.status(401).json({ error: "Invalid token" });
  }
});

recordRoutes.delete('/admin/flights/:id', keycloak.protect(), async (req, res) => {
  const token = req.kauth.grant.access_token.token;
  const decodedToken = jwt.decode(token, { complete: true });

  if (decodedToken) {
    const roles = decodedToken.payload.realm_access.roles || [];
    if (roles.includes("admin")) {
      const flightId = req.params.id;
      const db = dbo.getDb();
      const collection = db.collection('flights');
      const result = await collection.deleteOne({ _id: ObjectId(flightId) });
      if (result.deletedCount === 1) {
        res.json({ message: "Flight was deleted" });
      } else {
        res.status(404).json({ error: "Flight with given ID doesn't exist" });
      }
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = recordRoutes;
