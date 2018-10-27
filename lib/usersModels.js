'use strict'
const mongoose = require('mongoose')

var usersSchema = mongoose.Schema({
    name: String,
    password: String
  }) 

var Users = mongoose.model('Users', usersSchema)

module.exports = Users