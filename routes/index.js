'use strict'

var express = require('express');
var router = express.Router();
const validations = require('../lib/validations')
const getParams = require('../lib/functions')

/* GET home page. */

router.get('/', validations, getParams)

module.exports = router;
