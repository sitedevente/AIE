/* eslint-disable no-console */
const express = require('express');

// process.env.DB_HOST and dotenv

const app = express();
const bien = require('./routes/Bien');

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
  console.log('Request received! to ' + req.originalUrl);
  next();
})

.use('/bien', bien)

.get('/favicon.ico', (req, res) => res.status(204));

module.exports = app;