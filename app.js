const express = require('express');
const app = express();
const {estate} = require('./routes');

app

.use((req, res, next) => {
	res.header({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    });
	res.contentType('application/json');
	next();
})

.use((req, res, next) => {
  console.log(`Request received! to ${req.originalUrl} via HTTP ${req.method} method`);
  next();
})

.use('/estate', estate)

.get('/favicon.ico', (req, res) => res.status(204));

module.exports = app;