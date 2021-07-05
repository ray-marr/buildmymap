const express = require('express');
const cors = require('cors');
const index = require('./api/index');
const helmet = require('helmet');
const app = express();

var whitelistUrls = [
  'https://buildmymap.com/customMap',
  'http://localhost:3000/customMap',
  'https://localhost:3000/customMap',
  'http://desktop-m9t3shv:3000/customMap',
  'http://desktop-m9t3shv:3000/customMap',
  'https://desktop-m9t3shv:3000/customMap',
  'https://buildmymap.azurewebsites.net/customMap'
];

app.use(function (req, res, next) {
  if (whitelistUrls.indexOf(req.headers.referer) === -1) {
      new Error('Not allowed by CORS');
  }
  next();
});


const port = 5000;

app.use('/api', helmet.noCache(), index.setup());

app.listen(port, () =>
  console.log('Express App listening on port', port),
);
