const express = require('express');
const requestPromise = require('request-promise-native');


exports.setup = () =>{
  const router = express.Router();

  router.get('/*', (req, res) => {
    let location = req.query.location;

    requestPromise(
      {
       "method":"GET",
       "uri": "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json",
       "encoding": "utf8",
       "resolveWithFullResponse": true,
       "qs": {
         "access_token": "#ADD_ACCESS_TOKEN#",
         "autocomplete": "true"
       }
      }
    ).then(response => { res.send(response.body)})
    .catch(error => {
      console.log(error);
    });
  });

  return router;
}
