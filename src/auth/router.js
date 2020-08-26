'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./middleware.js');
const users = require('./users-model');

router.post('/signup', (req, res, next) => {
  const user = new users(req.body);

  user.save()
    .then(user => {
      let token = user.generateToken(user);
      res.status(200).send(token);
    })
    .catch(e => {
      console.error(e);
      res.status(403).send('Error Creating User');
    });
});

router.post('/signin', basicAuth, (req, res, next) => {

  res.cookie('basicAuth', req.token);
  res.send({
    token: req.token,
    user: req.user,
  });

});

router.get('/users', (req, res, next) => {
  user.find()
    .then(info => {
      res.status(200).json(info);
    });
  // res.send({
  //   user: req.user,
  // })
});

router.get('/oauth', OAuthMiddleware, (req, res, next) => {
  res.status(200).send(req.token);
  //?
})

module.exports = router;