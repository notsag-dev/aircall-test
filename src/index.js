const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const http = require('http');
const config = require('./config');
const adapters = require('./adapters');

const app = express();

// Set middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set API endpoints
adapters.set(app);

// Listen
const httpServer = http.createServer(app);
httpServer.listen(config.port, () => {
  console.log(`App listening on port ${config.port}!`);
});
