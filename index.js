'use strict';

require('dotenv').config();

const server = require('./src/server');
const mongoose = require('mongoose');

const options = {
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, options);

server.start(process.env.PORT);
