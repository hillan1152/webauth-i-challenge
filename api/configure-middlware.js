const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const knexSessionStore = require('connect-session-knex')(sessions)
const knex = require('../database/dbConfig.js')

const sessionConfig = {
  // session storage options
  name: 'chocolatechip', // default ID. 
  secret: 'keep it a secret', // USED FOR ENCRYPTION (must be an environment variable)
  saveUninitialized: true, // has implications with GDPR laws
  resave: false,

  store: new knexSessionStore({ // NEED THE NEW KEYWORD!!!!!!!!!!!!!
    knex,
    createTable: true,
    clearInterval: 1000 * 60 * 10,
    sidfieldname: 'sid',
    // OPTIONAL
    tablename: 'sessions',
  }),  
  // cookie options
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 MIN IN MILLISECONDS
    secure: false, // If false the cookie is sent over HTTP, if true onl y sent over https 
    httpOnly: true // If true JS cannot access the cookie, SECURITY MEASURE. 
  }
}




module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(sessions(sessionConfig));
};
