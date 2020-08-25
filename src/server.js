'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));

const authRouter = require('./auth/router.js');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(authRouter);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server is Up on ${port}`);
    });
  },
};
