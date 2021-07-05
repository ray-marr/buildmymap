const express = require('express');
const requestPromise = require('request-promise-native');


exports.setup = () =>{
  const router = express.Router();

  router.get('/*', (req, res) => {
    let xValue = req.query.x;
    let yValue = req.query.y;
    let zValue = req.query.z;
    let style = req.query.style;

    requestPromise(
      {
       "method":"GET",
       "uri": "https://api.mapbox.com/styles/v1/rayzard/"+ style + "/tiles/256/" + zValue + "/" + xValue + "/" + yValue + "@2x",
       "encoding": null,
       "resolveWithFullResponse": true,
       "qs": {
         "access_token": "#ADD_ACCESS_TOKEN#"
       }
      }
    ).then(response => { res.send(response.body)})
    .catch(error => {console.log(error);});
  });

  return router;
}
