'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(morgan('dev'));

const errorHandler = require('./middleware/error.js');
const notFound = require('./middleware/404.js');
const authRouter = require('./auth/router.js');

app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(authRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server is Up on ${port}`);
    });
  },
};
