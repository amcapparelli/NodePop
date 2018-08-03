'use strict'

const express = require('express')
const router = express.Router()
const { check } = require('express-validator/check')
const Ads = require('../../lib/createModels')
const getParams  = require('../../lib/functions')
const validations = require('../../lib/validations')

router.get('/', validations, getParams)

router.post('/', [
    check('forSale').isBoolean(),
    check('price').isNumeric(),
    check('image').isDataURI(), 
    check('productName').isAlphanumeric(), 
    check('tags').isArray()
    ] ,async (req, res, next) => {
    try{
        const newAdData = req.body
        const newAd = new Ads(newAdData)
        const newAdSaved = await newAd.save()
        res.json({success: true, result: newAdSaved})
    } catch (err) {
        next(err)
    }
})

  module.exports = router