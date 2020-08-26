'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  fullname: { type: String },
  role: { type: String, required: true, enum: ['admin', 'editor', 'writer', 'user']},
});

users.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

users.statics.authenticeBasic = async function (username, password) {
  let query = { username };
  const user = await this.findOne(query);
  if (user) {
    return await user.comparePassword(password);
  } else {
    return null;
  }
}

users.methods.comparePassword = async function(plainPassword) {
  const valid = await bcrypt.compare(password, this.password);
  return valid ? this : null;
  // return bcrypt.compare(plainPassword, this.password)
  //   .then(valid => valid ? this : null);
}

users.methods.generateToken = function (user) {
  return jwt.sign({ username: user.username }, process.env.SECRET);
  // let tokenData = {
  //   id: this_id,
  // }

  // const signed = jwt.sign(tokenData, process.env.SECRET);

  // return signed;
}

module.exports = mongoose.model('users', users);