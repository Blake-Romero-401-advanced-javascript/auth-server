'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
});

users.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

users.statics.authenticeBasic = function (username, password) {
  let query = { username };
  const foundUser = await this.findOne(query);
  const match = foundUser && await foundUser.comparePassword(password);
  return match;
}

users.methods.comparePassword = function(plainPassword) {
  return bcrypt.compare(plainPassword, this.password)
    .then(valid => valid ? this : null);
}

users.methods.generateToken = function () {
  let tokenData = {
    id: this_id,
  }

  const signed = jwt.sign(tokenData, process.env.SECRET);

  return signed;
}

module.exports = mongoose.model('users', users);