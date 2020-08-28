'use strict';

require('dotenv').config();

const server = require('./src/server');

const mongoose = require('mongoose');
const options = {
  useNewUrlParser:true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGODB_URI, options);

require('./src/server.js').start(process.env.PORT);
