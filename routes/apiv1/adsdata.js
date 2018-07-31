'use strict'

const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const Ads = require('../../lib/createModels')
const getParams = require('../../lib/functions')


router.get('/', getParams)

router.post('/', [
    check('forSale', 'Must be bollean').isBoolean(),
    check('price').isNumeric(),
    check('image').isURL(), 
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