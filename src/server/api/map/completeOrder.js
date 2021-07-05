const express = require('express');
const requestPromise = require('request-promise-native');

//TODO setup .env file to handle credentials
const mongoUser = '#ADD_USER#';
const mongoPass = '#ADD_PASS#';
const mongoDBName = '#ADD_DB_NAME#';
const ordersCollection = 'orders';
var MongoClient = require('mongodb').MongoClient;
const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPass}@buildmymapcluster.mtp0e.azure.mongodb.net/${mongoDBName}?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(mongoUrl, { useNewUrlParser: true });

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


exports.setup = () =>{
  const router = express.Router();

  router.post('/*', jsonParser, (req, res) => {
    mongoClient.connect(err => {
      const collection = mongoClient.db(mongoDBName).collection(ordersCollection);
      // perform actions on the collection object
      collection.insertOne(req.body);
      mongoClient.close();
    });

    res.sendStatus(200);
  });

  return router;
}
