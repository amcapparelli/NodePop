var express = require('express');
var router = express.Router();
const getParams = require('../lib/functions')

/* GET home page. */

router.get('/', getParams)

module.exports = router;
