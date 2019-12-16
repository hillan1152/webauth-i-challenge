const express = require('express');

const apiRouter = require('./api-router');
configureMiddleware = require('./configure-middlware');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

module.exports = server;