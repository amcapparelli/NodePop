'use strict'

const express = require('express')
const router = express.Router()


router.get('/*', (req, res, next) => {
    res.json({success: false, 
              code: 404, 
              error: 'not found'})
})

module.exports = router