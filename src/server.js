'use strict';

//3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


//Esoteric Resources
const errorHandler = require('./middleware/error.js');
const notFound = require('./middleware/404.js');
const authRouter = require('./auth/router.js');
const extraRouter = require('./extra-routes.js');

const app = express();
// require('dotenv').config();

//App level middleware
app.use(cors());
app.use(morgan('dev'));

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use(authRouter);
app.use(extraRouter);

//Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT ||3000;
    app.listen(PORT, ()=> console.log(`listening on ${PORT}`));
  },
};
