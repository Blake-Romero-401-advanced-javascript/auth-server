'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware.js');
const Users = require('./users-model.js');
const oauthMiddleware = require('./oauth.js');
const bearerAuth = require('./bearer-auth.js');
const usersModel = require('./users-model.js');

let secret = process.env.SECRET;

router.post('/signup', async (req, res, next) => {
  const user = await Users.create(req.body);

  const token = user.generateToken();

  const responseBody = {
    token,
    user,
  };

  res.send(responseBody);
  // const user = new Users(req.body);

  // user.save()
  //   .then(user => {
  //     let token = user.generateToken(user);
  //     res.status(200).send(token);
  //   })
  //   .catch(e => {
  //     console.error(e);
  //     res.status(403).send('Error Creating User');
  //   });
});

router.post('/signin', basicAuth, (req, res, next) => {

  res.cookie('basicAuth', req.token);
  res.set('token', req.token);

  res.send({
    token: req.token,
    user: req.user,
  });

});

router.get('/users', (req, res) => {
  res.status(200).json(info);
});

router.get('/oauth', oauthMiddleware, (req, res, next) => {
  res.status(200).send(req.token);
  //?
});

// router.get('/users', bearerAuth, (req, res, next) => {
//   usersModel.find({})
//   .then(users => {
//     res.status(200).json(req.user);
//   }).catch(next);
// });

module.exports = router;