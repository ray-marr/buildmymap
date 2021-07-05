const express = require('express');
const map = require('./map/map');
const location = require('./map/location');
const completeOrder = require('./map/completeOrder');


exports.setup = () => {
  const router = express.Router();

  //List of apis to route to - here we serve api from map.js file
  router.use('/map', map.setup());
  router.use('/location', location.setup());
  router.use('/completeOrder', completeOrder.setup());

  return router;
}
